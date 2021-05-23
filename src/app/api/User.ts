import {get, update, deleteElements, create} from "@database/db";
import hash from "@utils/hash";
export interface User {
    id?: string,
    description?: string,
    name?:string,

}
export interface AuthUser extends User {
    password:string
}


// Create

export const createUser = (user:User) => create(user, "User");
export const createAuthUser = (user:AuthUser) => generateUser(user);

function generatePassword(password:string){
    password = hash(password).toString();
    return password;
};

function generateUser(user:AuthUser){
    user.password = generatePassword(user.password);
    return create(user, "User")
}


// Update

export const updateUser = (user:User) => update(
    {
        

},{id:user.id}, "User");

// Get
export const getUsers = (where?:string, orderBy?:string) => get(where, orderBy, "User");
export const getOneUser = (id:number|string) => get("id="+id, null, "User");
export async function fnInit(){
    await createUser({
        name:`Dekharen`,
        description:'sike'
    })
    console.log("user created")
}

// Auth

function comparePassword(givenPassword:string, dbPassword:string|undefined|null) {
    if(!dbPassword){
    return true;
    }
    return (generatePassword(givenPassword) === dbPassword);
}

async function Login (username:string, password:string) {
    if(!username){
        throw 'No username';
    }
    let users:AuthUser[] = await getUsers("name ="+username);
    const user:AuthUser = users[0];
    if(!user){
        throw 'Not registered';
    }
    const isAuthorized = comparePassword(password, user.password);

    if (!isAuthorized){
        //todo : setLogin > false in Redux;
        return false;
    }
    //todo : setUser = user (w/o hash I guess?);
    return true;
};
