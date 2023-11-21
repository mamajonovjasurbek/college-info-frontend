import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import {
    Box,
    Button,
    CircularProgress,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

type Inputs = {
    login: string;
    password: string;
};

const login = async (data: Inputs) => {
    return await instance.post('/login', data);
};

export const Auth = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<Inputs>();

    const { data, mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data);
    };

    if (data?.data) {
        const cookies = new Cookies();
        console.log(data?.data);
        cookies.set('Authorization', data?.data?.Authorization, {
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        cookies.set('role', data?.data?.role, {
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        cookies.set('name', data?.data?.name, {
            path: '/',
            sameSite: 'none',
            secure: true,
        });
        navigate('/home');
    }

    return (
        <div className="bg-dark-bg w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 p-10 bg-white rounded-lg flex flex-col gap-6">
                {isPending ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography
                            variant="h5"
                            className="text-dark-bg text-center">
                            Авторизация
                        </Typography>
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
                            {...register('login', { required: true })}
                        />
                        <InputLabel htmlFor="login">Пароль</InputLabel>
                        <Input
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <KeyIcon />
                                </InputAdornment>
                            }
                            {...register('password', { required: true })}
                        />
                        <Button
                            type="submit"
                            variant="contained">
                            Отправить
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
};
