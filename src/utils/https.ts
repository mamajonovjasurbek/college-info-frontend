import Cookies from 'universal-cookie';
import { IStudent, ITest } from '../types/student';
import { ICreateUser, IUser, IUserPassword } from '../types/user';
import { saveAs } from 'file-saver';
import axios from 'axios';

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

interface IUpdateProps {
    id: string;
    data: IStudent;
}

export async function updateStudentByID({ id, data }: IUpdateProps) {
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

export async function createStudent(data: FormData) {
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

    return response.data;
}

export async function deleteSelectedStudent(id: string[]) {
    const cookies = new Cookies();
    const token = cookies.get('Authorization');

    const response = await instance({
        method: 'delete',
        url: '/students',
        data: id,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function testForm(data: FormData) {
    const response = await instance({
        method: 'post',
        url: '/form',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}
