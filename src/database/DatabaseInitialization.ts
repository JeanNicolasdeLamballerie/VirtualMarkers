import SQLite, {DEBUG} from "react-native-sqlite-storage"

export class DatabaseInitialization {
  
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    function logVersion(tx: SQLite.Transaction, version: any) {
      dbVersion = version;
      console.log("Current database version is: " + dbVersion);

      // Perform DB updates based on this version

      // This is included as an example of how you make database schema changes once the app has been shipped
      if (dbVersion < 1) {
        // Uncomment the next line, and the referenced function below, to enable this
        // return database.transaction(this.preVersion1Inserts);
      }
      // otherwise,
      return;
    }
    console.log("Beginning database updates...");

    // First: create tables if they do not already exist
    return new Promise((resolve, reject) => {
      console.log("before")
      database
      .transaction(this.createTables,(a) => void 0, async () => {
        console.log('An error has occured, getting db version')
        // Get the current database version
        try{

          const vers = await this.getDatabaseVersion(database);
          console.log(vers)
          resolve(vers);
        }
        catch(err) {
          console.log(err)
        }
      console.log("after")

      })
    }) 
      .then((version:number|unknown) => {
        if (typeof version ==='number' && version < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    DEBUG(true);
    
    console.log("creating tables...")
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql("DROP TABLE IF EXISTS User;", [], (a,b) => console.log(a,b,'succ'), (a, b) => console.log(a,b,'err'));
      //   transaction.executeSql("DROP TABLE IF EXISTS ListItem;");
      transaction.executeSql("DROP TABLE IF EXISTS Version;", []);
    }

    // List table
    transaction.executeSql("PRAGMA encoding",[], (s, e:any ) =>  console.log('ENCODING :' ,s, e.rows.item(0)));
    console.log("creating User table.")
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS User(
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(40),
        description TEXT,
        password TEXT
      );
    `, [], (a, b) => console.log("success :",b), (a, b) => console.log("err :",b));

    console.log("User table created.")

    // ListItem table
    console.log("creating Bookmark table.")

    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Bookmark(
        id INTEGER PRIMARY KEY NOT NULL,
        user_id INTEGER,
        title TEXT,
        collection INTEGER,
        comment TEXT,
        FOREIGN KEY ( user_id ) REFERENCES User ( id )
      );
    `);
    console.log("Bookmark table created.")


    // Version table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
    transaction.executeSql(`INSERT INTO User (name, description) VALUES ('Frank', 'Bountiful');`)
    console.log("Version table created. Table creation function over.")
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    console.log("getting db version...")
    // Select the highest version number from the version table
    return new Promise((resolve, reject) => {
      database
        .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;", [],
          (results) => {
            if (results?.rows && results.rows.length > 0) {
              const version = results.rows.item(0).version;
              console.log("success... Version is : ", version)
              resolve(version);
            } else {
              console.log("No version defined...")
              resolve(0);
            }
          },
          (error) => {
            console.log(`No version set. Returning 0. Details: ${error}`);
            resolve(0);
          });

    }
    )
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }
    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");
        
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}