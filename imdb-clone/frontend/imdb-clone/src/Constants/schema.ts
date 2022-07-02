export interface User {
    id:number,
    name:string,
    gender:string,
    bio:string,
    dob:string
}


export interface Movie {
    name:string,
    year_of_release:string,
    plot:string,
    poster:string
}




export type Gender = "Male"|"Female"|"Other"