import {promises as fs} from "fs";
import { Bookmark } from "../features/bookmark/typesBookmark";
const getBookmarksFile = () => fs.readFile('./database.json')
const addBookmark = (base:Array<Bookmark>|Buffer, data:Bookmark[]) => {
    try {
        if(!Array.isArray(base)){
            throw "CORRUPTED"
        }
        base.push.apply(base, data)
        return base;
    }

    catch(err){
       // TODO : implement error state;
}
}
const saveFile = (data:Array<Bookmark>) => {
    const database = data.toString();
    fs.writeFile('./database.json', database)
}
    export const fetchBookmark = async (id:number) => {
try {
 const fileContent:Buffer = await getBookmarksFile()
return fileContent;
}
catch (err) {
    // TODO : implement error state;
    console.log(err)
}
}


export {}