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
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import {muiBtn} from "../styles/mui-styles.ts";

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

    const [, setAuthCookie] = useCookies(['Authorization']);

    const [, setRoleCookie] = useCookies(['role']);

    const [, setNameCookie] = useCookies(['name']);

    const [, setGroupCookie] = useCookies(['group']);

    const [, setGroupIDCookie] =  useCookies(['groupID']);

    const { register, handleSubmit } = useForm<Inputs>();

    const { data, mutate, isError, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (data?.data) {
            console.log(data?.data);

            setAuthCookie('Authorization', data?.data?.Authorization, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            setRoleCookie('role', data?.data?.role, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            setNameCookie('name', data?.data?.name, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            setGroupCookie('group', data?.data?.group, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            setGroupCookie('group', data?.data?.group, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            setGroupIDCookie('groupID', data?.data?.groupID, {
                path: '/',
                sameSite: 'none',
                secure: true,
            });

            navigate('/home');
        }
    }, [data, navigate, setAuthCookie, setNameCookie, setRoleCookie]);

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
                            className="text-center">
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
                            variant="contained"
                            sx = {muiBtn}
                        >
                            Отправить
                        </Button>
                        {isError && (
                            <p className="text-rose-700 block text-center">
                                Неправильный логин или пароль
                            </p>
                        )}
                    </>
                )}
            </form>
        </div>
    );
};
