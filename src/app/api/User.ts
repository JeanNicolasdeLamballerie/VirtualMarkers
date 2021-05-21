import {get, update, deleteElements, create} from "@database/db";
export interface User {
    id?: string,
    description?: string,
    name?:string
}
const createUser = (user:User) => create(user, "User");
const updateUser = (user:User) => update(
    {
        

},{id:user.id}, "User");
const getUsers = (where:string|null|undefined, orderBy:string|null|undefined) => get(where, orderBy, "User");
const getOneUser = (id:number|string) => get("id="+id, null, "User");
export async function fnInit(){
    await createUser({
        name:"Frank",
        description:"Bountiful"
    })
    console.log("user created")
}
