import SQLite from "react-native-sqlite-storage"
import { DatabaseInitialization } from "./DatabaseInitialization";

// import { ListItem } from "../types/ListItem";

import { DATABASE } from "@constants";
//import { DropboxDatabaseSync } from "../sync/dropbox/DropboxDatabaseSync";
import { AppState, AppStateStatus } from "react-native";

export interface Database {
  // Create
  create(data: Object, tableName: string): Promise<Boolean>;

  // Read
  get(table: string, where: string, orderBy: string|undefined|null): Promise<[] | Object[]>,

  // Update
  update(data:Object, where:{id:string}, tableName:string): Promise<Boolean>,

  // Delete
  deleteElements(data:{id:string}, tableName:string): Promise<Boolean>,
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;
//const databaseSync: DropboxDatabaseSync = new DropboxDatabaseSync();

type Accumulator = [string[], string[], number]

//TODO /////////////////////////////////
//!                                   //
//! Need to fully prevent injection   //
//!                                   //
//TODO /////////////////////////////////

//& Function to be curried in our API, will allow us to handle all creation requests for the Database

//& Returns a Boolean if the operation is successful.
export async function create(data: Object, tableName: string): Promise<Boolean> {
  //TODO: Needs to be wrapped in an error handler when curried
  console.log("Starting creation...")

  // Initialize a new Accumulator for our reducer function that will hold columns, values, and question marks; 
  // We need those three values to decide where and what to add to the database.
  const initialAccumulator: Accumulator = [[], [], 0]

  const reducer = (accumulator: Accumulator, currentValue: [string, string]) => {
    accumulator[0].push(currentValue[0]);
    accumulator[1].push(currentValue[1]);
    accumulator[2]++;
    return accumulator;
  }


  const concatString = (element: any, i: number) => {
    switch (i) {
      case 0:
        return element.join(', '); //Returns "key1, key2, key3, ..."
      case 2:
        return fillQuestionMark(Array(element)).join(', '); //Returns "?, ?, ?, ..." * keysLength
      default:
        return element; //Returns [values]
    }
  };

  const fillQuestionMark = (arr: any[]) => arr.fill('?');

  const [columns, values, questionMarks]:any[] | [string, string[], string] = Object.entries(data).reduce(reducer, initialAccumulator).map(concatString);
  console.log("columns :", columns, "values : ", values, "question marks", questionMarks, "columns, values, questionMarks");
  console.log(`INSERT INTO ${tableName} (${columns}) VALUES (${questionMarks});`)
  return getDatabase()
    .then((db) => new Promise<{insertId:number}>((resolve, reject) => {
      db.executeSql(`INSERT INTO ${tableName} (${columns}) VALUES (${questionMarks});`, 
      values.map((e:string) =>  `'${e}'`)
      ,
      (results, a) =>{ 
        console.log("successful creation !", results, a)
        resolve(results)
      },(_, err) => console.log("err", err)
    
      )
    }
    ))
    .then((results) => {
      console.log("results : ", results)
      if(results?.insertId){

        const { insertId } = results;
        console.log(`[db] Added : "`, data, 'as ', values, ` ! InsertId: ${insertId}`);
        
        // Queue database upload
        return true;
      }
      else return false;
    }
    );
}



export async function get(where: string|undefined|null, orderBy: string|undefined|null, tableName: string): Promise<[] | any[]> {
  //& Following the same pattern as create, we create a getAll function on which we'll do a partial application

  //TODO
  //! "where" is not escaped here

  console.log("[db] Fetching from the db...");
  return getDatabase()
    .then((db) =>
      // Get all the lists, ordered by newest lists first
     new Promise<{rows:any}>((resolve, reject) => {
       console.log(`SELECT * FROM ${where ? tableName + ' WHERE ' + where : tableName} ${orderBy? orderBy : "ORDER BY id DESC"};`)
       db.executeSql(`SELECT * FROM ${where ? tableName + ' WHERE ' + where : tableName} ${orderBy? orderBy : "ORDER BY id DESC"};`, [], (results) => resolve(results),(tx, err) => console.log(err))

     })
    )
    .then((results) => {
      console.log(results)
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const items = [];
      console.log(results);
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        console.log(row);
        //const { title, id } = row;
        console.log(`[db] => getAll`);
        items.push(row);
      }
      return items;
    });
}


export async function update(data:Object, where:{id:string|null|undefined}, tableName:string): Promise<Boolean> {
  if(!data){
    throw new Error(`No data given to perform update`);
  }
  //?Currently restricted to single element changes
  //TODO: add if needed
  if(!where?.id){
    throw new Error('No identifier for updating target')
  }
  // const doneNumber = listItem.done ? 1 : 0;
  const reducer = (accumulator:any, currentValue: [string, string]) => {
    accumulator[0].push(`${currentValue[0] +" = ?"}`);
    accumulator[1].push(currentValue[1]);
    //accumulator[2]++;
    return accumulator;
  }
  const [set, values ]:[string[], Array<string|number>] = Object.entries(data).reduce(reducer, [[],[]]);
  values.push(where.id);

  const setter:string = set.join(', ');
  
  return getDatabase()
    .then((db) =>
    new Promise((resolve, reject) =>
    {
      db.executeSql(`UPDATE ${tableName} SET ${setter} WHERE id = ?;`, values, (_, results) => resolve(results))
    })
    )
    .then((results) => {
      console.log(`[db] item with id: ${where.id} in ${tableName} updated.`);
      return true;

      // Queue database upload
      //  return databaseSync.upload();
    });
};

export async function deleteElements(data:{id:string}, tableName:string): Promise<Boolean> {
  if(!data||!data.id){
    throw new Error("No identifier provided")
  }
  console.log(`[db] Deleting element with id: ${data.id}`);
  return getDatabase()
    .then((db) => {
      // Delete list items first, then delete the list itself
      new Promise((resolve, reject) => {
        db.executeSql(`DELETE FROM ${tableName} WHERE id = ?;`, [data.id], (_, results) => resolve(results))
        
      }) 
      .then(() => db);
    })
    //TODO delete associated keys (maybe can be configurated with a waterfall effect on the db ?)
   // .then((db) => db.executeSql("DELETE FROM List WHERE list_id = ?;", [list.id]))
    .then(() => {
      console.log(`[db] Deleted !`);
      return true;
      // Queue database upload
      //  return databaseSync.upload();
    });
}

// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  // SQLite.DEBUG(true);
  // SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: "default",
  });
  console.log("[db] Database open!");

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  console.log(db)
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log("[db] Database closed.");
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = "active";
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log("[db] App has gone to the background - closing DB connection.");
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  create,
  deleteElements,
  update,
  get,
};