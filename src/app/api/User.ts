import {get, update, deleteElements, create} from "@database/db";
export interface User {

}
const createUser = (user:User) => create(user, "User");
const updateUser = (user:User) => create(user, "User");
const getUsers = (where:string|null|undefined, orderBy:string|null|undefined) => get(where, orderBy, "User");
const getOneUser = (id:number|string) => get("id="+id, null, "User");
async function fnInit(){
    await createUser({
        name:"Frank",
        description:"Bountiful"
    })

}
fnInit()