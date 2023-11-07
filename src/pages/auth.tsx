import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { Button, Input, InputAdornment, InputLabel } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios'


const instance = axios.create(
    {
        baseURL : "https://college-info-backend-production.up.railway.app"
    }
)

type Inputs = {
    email: string;
    password: string;
};

const  login  = async(data : Inputs) =>{
    const response = await instance.post("/login" ,data)

    return await response
}


export const Auth = () => {


    const navigate = useNavigate();
    const {mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn:login,
        onSuccess: () => {
            navigate('/');
        },
    });
        
    // const {data} = useQuery({
    //     queryKey: ["validate"],
    //     queryFn: () => instance.get("/validate")
    // })
    // console.log(data);
    
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {        
        mutate(data)
    };
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-sky-500 border-2 p-10 rounded-lg flex flex-col gap-6">
                <h1 className="text-2xl text-center text-sky-500">
                    Authorization
                </h1>
                <InputLabel
                    className="text-sky-500"
                    htmlFor="email">
                    Email
                </InputLabel>
                <Input
                    placeholder="Email"
                    id="login"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    {...register('email')}
                />
                <InputLabel htmlFor="login">Password</InputLabel>
                <Input
                    id="Password"
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
                    Submit
                </Button>
            </form>
        </div>
    );
};
