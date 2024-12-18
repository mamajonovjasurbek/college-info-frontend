export interface IUser {
    id: string;
    name: string;
    login: string;
    role: number;
    group_id: string;
    group_name: string;
    created_at : string;
    updated_at : string;
}

export interface IUserPassword {
    newPassword: string;
    confirmPassword: string;
}

export interface ICreateUser {
    name: string;
    login: string;
    password: string;
    role: number;
    group_id: string;
}
