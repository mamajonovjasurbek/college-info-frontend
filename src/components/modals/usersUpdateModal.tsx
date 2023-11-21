/* eslint-disable react-refresh/only-export-components */
import { Box, Button, Input, InputLabel, Modal, Typography } from '@mui/material';
import { useMutation} from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserPassword } from '../../types/user';
import { updataUserByID } from '../../utils/https';

interface IProps {
    show: boolean;
    id: number;
    showHandler: Dispatch<SetStateAction<boolean>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function UserUpdateModal(props: IProps) {
    const [same, setSame] = useState(true);
    const handleClose = () => props.showHandler(false);
    const { mutate } = useMutation({
        mutationFn: updataUserByID,
        onSuccess : () =>{
            handleClose()
        }
    });

    const onSubmit = (data: IUserPassword) => {
        console.log(data);
        if (data.newPassword !== data.confirmPassword) {
            setSame(false);
        } else {
            mutate({id : props.id,  data:  data});
            setSame(true);
        }
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
                        className="border-2 p-10 rounded-lg flex flex-col gap-6">
                        <Typography variant="h5" className="text-dark-bg text-center">
                            Изменить пароль
                        </Typography>
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Новый пароль
                        </InputLabel>
                        <Input
                            placeholder="Введите пароль"
                            id="password"
                            {...register('newPassword', { required: true })}
                        />
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Подвердить пароль
                        </InputLabel>
                        <Input
                            placeholder="Введите пароль"
                            id="confirmPassword"
                            {...register('confirmPassword', { required: true })}
                        />
                        <Button
                            type="submit"
                            variant="contained">
                            Изменить
                        </Button>
                        {!same && (
                            <p className="block text-center text-red-700">
                                Пароли не одинаковые!
                            </p>
                        )}
                    </form>
                </Box>
            </Modal>
        </>
    );
}
