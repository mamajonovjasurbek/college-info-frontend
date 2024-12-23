import Cookies from 'universal-cookie';
import {ICreateStudent, IImageKey, IStudent, IStudentExcel, IUpdateStudent} from '../types/student';
import {ICreateUser, IUserPassword} from '../types/user';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {IGroup} from "../types/group.ts";
import {INotification} from "../types/notification.ts";

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (401 === error.response.status) {
            const cookies = new Cookies();
            cookies.remove('Authorization', { sameSite: 'none', secure: true });

            cookies.remove('role', { sameSite: 'none', secure: true });

            cookies.remove('name', { sameSite: 'none', secure: true });

            cookies.remove('group', { sameSite: 'none', secure: true });

            cookies.remove('groupID', { sameSite: 'none', secure: true });

            alert('Ошибка при аутентификации , залогинитесь снова пожалуйста');
            window.location.replace('/');
        }
        return Promise.reject(error);
    },
);

interface IUpdateUserProps {
    id: string;
    data: IUserPassword;
}

export async function updateUserByID({ id, data }: IUpdateUserProps) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'put',
        url: '/users/password',
        data: {
            id : id,
            password: data.newPassword,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

export async function getStudents() {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');
    const response = await instance.get('/students', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status == 401) {
        throw new Error('auth');
    }

    return response.data.data;
}

export async function getUsers() {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance.get('/users', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
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

    return response.data.data;
}

export async function fetchGroups():Promise<IGroup[]> {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'get',
        url: '/groups',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data as IGroup[];
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
            role: data.role,
            group_id: data.group_id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

export async function postStudentsData(data: IStudentExcel[]) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    await instance({
        url: '/students/excel',
        method: 'POST',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    }).then((result) => {
        console.log(result);
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

    return response.data.data;
}

export async function updateStudentByID( data: IUpdateStudent) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);
    const response = await instance({
        method: 'put',
        url: '/students',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

export async function getStudentByID(id: string): Promise<IStudent> {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'get',
        url: '/students/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data as IStudent; // Указываем, что данные соответствуют типу IStudent.
}

export async function createStudent(data: ICreateStudent) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);

    const response = await instance({
        method: 'post',
        url: '/students',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}


export async function deleteSelectedStudent(id: string[]) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'delete',
        url: '/students/' +id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}

export async function fetchNotifications() :Promise<INotification[]>{
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'get',
        url: '/notifications',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data as INotification[];
}

export async function viewNotifications(data : string[]) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'post',
        url: '/notifications/view',
        data : {
            ids:data
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}


export async function updateStudentImage( data: FormData) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);
    const response = await instance({
        method: 'post',
        url: '/students/add/image',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}


export async function uploadStudentImage( data: FormData) :Promise<IImageKey>{
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);
    const response = await instance({
        method: 'post',
        url: '/students/cache/file',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data.data)
    return response.data.data;
}

export async function uploadStudentsExcel( data: FormData){
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    console.log(data);
    const response = await instance({
        method: 'post',
        url: '/students/excel/upload',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data.data)
    return response.data.data;
}


export async function createGroup(data: string) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'post',
        url: '/groups/create',
        data: {
            name: data,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.data;
}