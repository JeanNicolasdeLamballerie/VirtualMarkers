//Bookmark types
type showType ='anime'|'manga'|'movie'|'show'|null;


//Bookmark interface
export interface Bookmark {
    id?:number|string,
    name:string,
    url:string,
    createdAt:number,
    updatedAt:number,
    type : showType,
    show?:number,
    temporary?:boolean,
    locked?:boolean
};

export type payloadCreate = Array<Bookmark>

export interface BookmarkUniqueSearch {
    id?:number|string,
};

export interface BookmarkOptionsSearch {
    name?:string,
    url?:string,
    createdAt?:number,
    updatedAt?:number,
    type?:showType,
    show?:number,
    temporary?:boolean
};
