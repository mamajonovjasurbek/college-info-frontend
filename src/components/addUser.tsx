import {
    AlertColor,
    Box,
    Button,
    CircularProgress, Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent, TextField,
    Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, fetchGroups } from '../utils/https.ts';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IGroup } from '../types/group.ts';
import { ICreateUser } from '../types/user.ts';
import { queryClient } from '../main.tsx';
import { modalStyle } from '../styles/mui-styles.ts';
import ErrorPage from '../pages/error.tsx';
import { SimpleSnackbar } from './snackbar.tsx';

export const AddUserComponent = memo(() => {
    const { register, handleSubmit, reset } = useForm<ICreateUser>();

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const [show, setShow] = useState(false);

    const [role, setRole] = useState('');

    const [group, setGroup] = useState('');

    const [isGroupDisabled, setIsGroupDisabled] = useState(true);

    const [isGroupEnabled , setIsGroupEnabled] = useState(false)

    const {
        data: groupsDatas,
        isLoading: isGroupsLoading,
        isError: isGroupsError,
        error: groupsError,
    } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
        enabled:isGroupEnabled
    });

    const { mutate, isError , isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            }).then(r => console.log(r));
            handleClose();
            setSnackMessage('Пользователь добавлен успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const handleClose = () => {
        reset();
        setGroup("")
        setRole("")
        setIsGroupEnabled(false)
        setShow(false);
    };

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);

        if (Number(event.target.value) === 3) {
            setIsGroupDisabled(false);
        } else {
            setGroup('');
            setIsGroupDisabled(true);
        }
    };

    const handleChangeGroup = (event: SelectChangeEvent) => {
        setGroup(event.target.value);
    };

    const onSubmit = (data: ICreateUser) => {
        mutate(data);

    };


    if (isGroupsError) {
        return <ErrorPage err={groupsError} />;
    }

    if (isError) {
        handleClose();
        setSnackMessage('Ошибка при создании пользователя');
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
                sx={{
                    width: 'fit-content',
                }}
                onClick={() => {
                    setShow(true);
                    setIsGroupEnabled(true)
                }}
                variant="contained">
                Добавить пользователя
            </Button>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {isGroupsLoading || isPending ? (
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
                                className="text-dark-bg">
                                Создать пользователя
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="login">Имя</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder="Введите имя"
                                        id="name"
                                        {...register('name', { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="login">
                                        Логин
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        placeholder="Введите логин"
                                        id="login"
                                        {...register('login', { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="login">
                                        Пароль
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        placeholder="Введите пароль"
                                        id="password"
                                        {...register('password', { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="login">
                                        Роль
                                    </InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        labelId="role-select"
                                        id="role-select"
                                        value={role}
                                        label="Роль"
                                        {...register('role_id', { required: true })}
                                        onChange={handleChangeRole}>
                                        <MenuItem value="">
                                            <em>Не выбрано</em>
                                        </MenuItem>
                                        <MenuItem value={2}>Админ</MenuItem>
                                        <MenuItem value={3}>Учитель</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="login">
                                        Группа
                                    </InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        labelId="group-select"
                                        id="group-select"
                                        value={group}
                                        label="Группа"
                                        {...register('group_id')}
                                        onChange={handleChangeGroup}
                                        disabled={isGroupDisabled}>
                                        <MenuItem value="">
                                            <em>Не выбрано</em>
                                        </MenuItem>
                                        {groupsDatas && groupsDatas.length &&
                                            groupsDatas.map((item: IGroup) => {
                                                return (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}>
                                                        <em>{item.name}</em>
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
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
