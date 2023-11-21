export interface IUser{
    id: string
    name : string
    login : string
    role_id : string
    group_id : string
}

export interface IUserPassword{
    newPassword : string
    confirmPassword : string
}


export interface ICreateUser {
    name : string
    login : string
    password : string
    role_id : number
    group_id : string
}