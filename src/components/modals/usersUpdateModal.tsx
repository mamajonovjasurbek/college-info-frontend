import { Box, Button, Input, InputLabel, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { IUser, IUserPassword } from '../../types/user';

interface IProps {
    show: boolean;
    id: number;
    showHandler: Dispatch<SetStateAction<boolean>>;
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
});

const getUserByID = async (id: number) => {
    const cookies = new Cookies();
    const token = await cookies.get('Authorization');

    const response = await instance.get('/users' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function UserUpdateModal(props: IProps) {
    const [same , setSame] = useState(true)
    const handleClose = () => props.showHandler(false);
    const {mutate} = useMutation({
        mutationFn: (id :string ,password : string , token : string) => {
            console.log(id , password , token)
          return instance({
              url : "users/" + id,
              method : "PUT",
              data : password,
              headers: {
                  "Authorization" : `Bearer ${token}`
              }
          })
        },
      })
    
    
    const onSubmit = (data:IUserPassword) => {
        console.log(data);
        if (data.newPassword  !== data.confirmPassword){
            setSame(false)
        }else{
            const cookies = new Cookies();
            const token = cookies.get("Authorization")

            console.log(token , props.id.toString() , data.newPassword)
            mutate(props.id.toString() , data.newPassword , token)
            setSame(true)
        }

        // setSame(true)
    };

    const { register, handleSubmit } = useForm<IUserPassword>();
    return (
        <>
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border-sky-500 border-2 p-10 rounded-lg flex flex-col gap-6">
                        <h1 className="text-2xl text-center text-sky-500">
                            Изменить пароль
                        </h1>
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Новый пароль
                        </InputLabel>
                        <Input
                            placeholder="Введите пароль"
                            id="password"
                            {...register('newPassword' , {required : true})}
                        />
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Подвердить пароль
                        </InputLabel>
                        <Input
                            placeholder="Введите пароль"
                            id="confirmPassword"
                            {...register('confirmPassword', {required : true})}
                        />
                        <Button
                            type="submit"
                            variant="contained">
                            Submit
                        </Button>
                        {!same && <p className='block text-center text-red-700'>Пароли не одинаковые!</p>}
                    </form>
                </Box>
            </Modal>
        </>
    );
}
