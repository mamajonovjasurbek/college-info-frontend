import {
    AlertColor,
    Box,
    Button,
    CircularProgress,
    Grid,
    InputLabel,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {createGroup} from '../utils/https.ts';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateUser } from '../types/user.ts';
import { queryClient } from '../main.tsx';
import {modalStyle, muiBtn} from '../styles/mui-styles.ts';
import { SimpleSnackbar } from './snackbar.tsx';
import {IGroupCreate} from "../types/group.ts";

export const AddGroupComponent = memo(() => {
    const { register, handleSubmit, reset } = useForm<ICreateUser>();

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const [show, setShow] = useState(false);


    const { mutate, isError, isPending } = useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['groups'],
                })
            queryClient.invalidateQueries({
                queryKey: ['notifications'] ,
            });
            handleClose();
            setSnackMessage('Группа добавлен успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const handleClose = () => {
        reset();
        setShow(false);
    };


    const onSubmit = (data : IGroupCreate) => {
        mutate(data.name);
    };


    if (isError) {
        handleClose();
        setSnackMessage('Ошибка при создании группы');
        setSnackType('error');
        setSnack(true);
    }

    return (
        <>
            <SimpleSnackbar
                show={snack}
                handleOpen={setSnack}
                message={snackMessage}
                type={snackType}
            />
            <Button
                sx={muiBtn}
                onClick={() => {
                    setShow(true);
                }}
                variant="contained">
                Добавить группу
            </Button>
            <Modal
                sx={{
                    overflow: 'scroll',
                }}
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {isPending ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={modalStyle}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="border-2 p-6 rounded-lg flex flex-col gap-6">
                            <Typography
                                variant="h5"
                                className="text-center text-black">
                                Создать группу
                            </Typography>
                            <Grid
                                container
                                spacing={2}>
                                <Grid
                                    item
                                    xs={12}>
                                    <InputLabel htmlFor="login">Название</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder="Введите имя"
                                        id="name"
                                        {...register('name', {
                                            required: true,
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained">
                                Создать
                            </Button>
                        </form>
                    </Box>
                )}
            </Modal>
        </>
    );
});
