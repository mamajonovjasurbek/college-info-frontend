import {AccountCircle} from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import {Button, Input, InputAdornment, InputLabel} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useMutation,} from '@tanstack/react-query';
import axios from 'axios'
import Cookies from 'universal-cookie';

const instance = axios.create(
    {
        baseURL : "http://localhost:5000"
    }
)

type Inputs = {
    login: string;
    password: string;
};

const  login  = async(data : Inputs) =>{
    return await instance.post("/login", data)
}


export const Auth = () => {


    const navigate = useNavigate();
    const {data,mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn:login,
    });



    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {        
        mutate(data)
    };

    if (data?.data){
        const cookies = new Cookies();
        console.log(data?.data)
        cookies.set('Authorization', data?.data?.Authorization, { path: '/' ,  sameSite: 'none', secure: true });
        cookies.set('role', data?.data?.role, { path: '/' ,  sameSite: 'none', secure: true });
        cookies.set('name', data?.data?.name, { path: '/' ,  sameSite: 'none', secure: true });
        navigate('/home');
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-sky-500 border-2 p-10 rounded-lg flex flex-col gap-6">
                <h1 className="text-2xl text-center text-sky-500">
                    Авторизация
                </h1>
                <InputLabel
                    className="text-sky-500"
                    htmlFor="login">
                    Логин
                </InputLabel>
                <Input
                    placeholder="Логин"
                    id="login"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    {...register('login')}
                />
                <InputLabel htmlFor="login">Пароль</InputLabel>
                <Input
                    placeholder = "Пароль"
                    type = "password"
                    id="password"
                    startAdornment={
                        <InputAdornment position="start">
                            <KeyIcon />
                        </InputAdornment>
                    }
                    {...register('password')}
                />
                <Button

                    type="submit"
                    variant="contained">
                    Отправить
                </Button>
            </form>
        </div>
    );
};
