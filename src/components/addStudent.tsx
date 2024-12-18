import {
    AlertColor,
    Box,
    Button,
    CircularProgress,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent, memo, useState, useMemo, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ErrorPage from '../pages/error';
import { SimpleSnackbar } from './snackbar';
import { createStudent, fetchGroups, uploadStudentImage } from '../utils/https';
import { ICreateStudent } from '../types/student.ts';
import { IGroup } from '../types/group.ts';
import { modalStyle, muiBtn } from '../styles/mui-styles.ts';
import '../utils/date.css';
import { queryClient } from '../main.tsx';
import Cookies from 'universal-cookie';
import { DragDrop } from "./dragDrop.tsx";

export const AddStudent = memo(() => {
    const cookies = new Cookies();
    const groupCookie = cookies.get('groupID');
    const { register, handleSubmit, reset } = useForm<ICreateStudent>();

    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const [snack, setSnack] = useState(false);
    const [snackType, setSnackType] = useState<AlertColor>('success');
    const [snackMessage, setSnackMessage] = useState('');
    const [show, setShow] = useState(false);
    const [group, setGroup] = useState('');
    const [date, setDate] = useState<string | null>('');
    const [isGroupEnabled, setIsGroupEnabled] = useState(false);
    const [imageKey, setImageKey] = useState<string | undefined>("");

    const defaultValues = useMemo<ICreateStudent>(() => ({
        name: '',
        birth_date: '',
        location: '',
        pass_number: '',
        pinfl: '',
        phone_number: '',
        study_dir: '',
        course: '',
        father: '',
        mother: '',
        group: '',
        group_id: '',
        image_key: '',
    }), []);

    const { data: groupsDatas, isLoading: isGroupsLoading, isError: isGroupsError, error: groupsError } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
        enabled: isGroupEnabled && groupCookie == '',
    });

    const { mutate, isError } = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['students']);
            // @ts-ignore
            queryClient.invalidateQueries(['notifications']);
            handleClose();
            setSnackMessage('Студент добавлен успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const { mutate: mutateAddFileImage } = useMutation({
        mutationFn: uploadStudentImage,
        onSuccess: (data) => {
            setImageKey(data?.key);
        },
    });

    const handleClose = useCallback(() => {
        reset(defaultValues);
        setGroup('');
        setFiles([]);
        setShow(false);
    }, [reset, defaultValues]);

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

    const handleChangeGroup = (event: SelectChangeEvent) => setGroup(event.target.value);

    const onSubmit = (data: ICreateStudent) => {
        data.image_key = imageKey as string;
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
    useEffect(() => {
        if (files.length > 0) {
            const formData = new FormData();
            formData.append('file', files[0]);

            mutateAddFileImage(formData);
        }
    }, [files ]);

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
                    setIsGroupEnabled(true);
                }}
                variant="contained">
                Добавить студента
            </Button>

            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {isGroupsLoading || isError ? (
                    <Box sx={{ display: 'flex', overflow: "auto" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={modalStyle}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="border-2 p-6 rounded-lg flex flex-col gap-6">
                            <Typography variant="h5" color={"black"} align={"center"}>
                                Создать студента
                            </Typography>
                            <Grid container spacing={2}>
                                {/* Поля формы */}
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="name">ФИО</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        required
                                        placeholder="Введите имя"
                                        id="name"
                                        {...register('name', { required: true })}
                                    />
                                </Grid>
                                {/* Другие поля формы */}
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="location">Место жительства</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите место жительства" id="location" {...register('location')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="pass_number">Номер паспорта</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите номер паспорта" id="pass_number" {...register('pass_number')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="pinfl">ПИНФЛ</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите ПИНФЛ" id="pinfl" {...register('pinfl')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="phone_number">Номер телефона</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите номер телефона" id="phone_number" {...register('phone_number')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="study_dir">Направление</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите направление" id="study_dir" {...register('study_dir')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="course">Курс</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите курс" id="course" {...register('course')} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="father">Отец</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите имя отца" id="father" {...register('father')}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="mother">Мама</InputLabel>
                                    <TextField variant="outlined" fullWidth placeholder="Введите имя мамы" id="mother" {...register('mother')} />
                                </Grid>
                                {groupCookie === '' && (
                                    <Grid item xs={6}>
                                        <InputLabel className="text-sky-500" htmlFor="group">Группа</InputLabel>
                                        <Select
                                            required
                                            displayEmpty
                                            fullWidth
                                            labelId="group-select"
                                            id="group-select"
                                            value={group}
                                            label="Группа"
                                            {...register('group_id', { required: true })}
                                            onChange={handleChangeGroup}>
                                            <MenuItem value="">
                                                <em>Не выбрано</em>
                                            </MenuItem>
                                            {groupsDatas?.map((item: IGroup) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    <em>{item.name}</em>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                )}
                                <Grid item xs={6}>
                                    <InputLabel className="text-sky-500" htmlFor="birth_date">Дата рождения</InputLabel>
                                    <Input
                                        id="birth_date"
                                        fullWidth
                                        className="date"
                                        {...register('birth_date')}
                                        type="date"
                                        value={date}
                                        onChange={handleDate}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="birth_date">
                                        Новое изображение
                                    </InputLabel>
                                    <DragDrop files={files} setFiles={setFiles}/>
                                </Grid>
                            </Grid>
                            <Button sx={muiBtn} type="submit" variant="contained">
                                Создать
                            </Button>
                        </form>
                    </Box>
                )}
            </Modal>
        </>
    );
});
