import Cookies from 'universal-cookie';
import { IStudent } from '../types/student';
import { ICreateUser, IUser } from '../types/user';
import { saveAs } from 'file-saver';
import axios from 'axios';

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

    if (response.status == 401) {
        throw new Error('auth');
    }

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

export async function deleteStudentByID(id: string) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'delete',
        url: '/students/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

// @ts-ignore
export async function updataStudentByID({ id, data }) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);
    const response = await instance({
        method: 'put',
        url: '/students/' + id,
        data: {
            location: data.location,
            pass_number: data.pass_number,
            phone_number: data.phone_number,
            study_dir: data.study_dir,
            course: data.course,
            group: data.group,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getStudentByID(id: string) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'get',
        url: '/students/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
