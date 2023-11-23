import Cookies from 'universal-cookie';
import { IStudent } from '../types/student';
import { ICreateUser, IUser } from '../types/user';
import { saveAs } from 'file-saver';
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
});

// @ts-ignore
export async function updataUserByID({ id, data }) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'put',
        url: '/users/' + id,
        data: {
            password: data.newPassword,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getStudents() {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');
    const response = await instance.get<IStudent[]>('/students', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getUsers() {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance.get<IUser[]>('/users', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function deleteUserById(id: string) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'delete',
        url: '/users/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function fetchGroups() {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'get',
        url: '/groups',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function createUser(data: ICreateUser) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'post',
        url: '/signup',
        data: {
            name: data.name,
            login: data.login,
            password: data.password,
            role_id: data.role_id,
            group_id: data.group_id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function postStudentsData(data: IStudent[]) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    await instance<IStudent[]>({
        url: '/students/excel',
        method: 'POST',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    }).then((result) => {
        console.log(result);
        // @ts-ignore
        saveAs(result.data, 'result.xlsx');
    });
}
