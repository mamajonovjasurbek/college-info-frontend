export interface IUser{
    id: string
    login : string
    role : string
    group : string
}

export interface IUserPassword{
    newPassword : string
    confirmPassword : string
}