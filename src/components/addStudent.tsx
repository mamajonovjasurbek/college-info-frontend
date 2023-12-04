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
import {ChangeEvent, memo, useState, useMemo} from 'react';
import { useForm } from 'react-hook-form';
import ErrorPage from '../pages/error';
import { SimpleSnackbar } from './snackbar';
import {createStudent, fetchGroups} from '../utils/https';
import { IStudent } from '../types/student.ts';
import { IGroup } from '../types/group.ts';
import { modalStyle, muiBtn } from '../styles/mui-styles.ts';
import '../utils/date.css';
import { queryClient } from '../main.tsx';
import Cookies from 'universal-cookie';
import {DragDrop} from "./dragDrop.tsx";

export const AddStudent = memo(() => {
    const cookies = new Cookies();

    const groupCookie = cookies.get('group');

    const groupIDCookie = cookies.get('groupID');

    const { register, handleSubmit, reset } = useForm<IStudent>();

    const [files, setFiles] = useState<(File & {preview:string})[]>([]);

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const [show, setShow] = useState(false);

    const [group, setGroup] = useState('');

    const [date, setDate] = useState<string | null>('');

    const [isGroupEnabled, setIsGroupEnabled] = useState(false);

    const defaultValues = useMemo<IStudent>(() => {
        return {
            name: '',
            birth_date: {
                String: '',
                Valid: false,
            },
            location: '',
            pass_number: '',
            pinfl: '',
            phone_number: '',
            study_dir: '',
            course: '',
            father: '',
            mother: '',
            group: '',
        };
    }, []);

    const {
        data: groupsDatas,
        isLoading: isGroupsLoading,
        isError: isGroupsError,
        error: groupsError,
    } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
        enabled: isGroupEnabled && groupCookie == ('admin' as string),
    });

    const { mutate, isError, isPending } = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['students'],
                })
                .then((r) => console.log(r));
            handleClose();
            setSnackMessage('Студент добавлен успешно');
            setSnackType('success');
            setSnack(true);
        },
    });


    const handleClose = () => {
        reset(defaultValues);
        setGroup('');
        setFiles([])
        setShow(false);
    };

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleChangeGroup = (event: SelectChangeEvent) => {
        setGroup(event.target.value);
    };
    const onSubmit = (data: IStudent) => {
        const formData = new FormData();
        const group: string =
            groupCookie != ('admin' as string)
                ? (groupIDCookie as string)
                : data.group;

        formData.append('name', data.name);
        formData.append('birth_date', date as string);
        formData.append('location', data.location);
        formData.append('pass_number', data.pass_number);
        formData.append('location', data.pinfl);
        formData.append('study_dir', data.study_dir);
        formData.append('course', data.course);
        formData.append('father', data.father);
        formData.append('mother', data.mother);
        formData.append('group', group);
        formData.append("image" , files[0])
        mutate(formData);
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
                {isGroupsLoading || isPending ? (
                    <Box sx={{ display: 'flex' , overflow: "auto"}}>
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
                                Создать студента
                            </Typography>
                            <Grid
                                container
                                spacing={2}>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel htmlFor="name">Имя</InputLabel>
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
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="location">
                                        Место жительства
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите место жительства"
                                        id="location"
                                        {...register('location')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="pass_number">
                                        Номер паспорта
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите номер паспорта"
                                        id="pass_number"
                                        {...register('pass_number')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="pinfl">
                                        ПИНФЛ
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите ПИНФЛ"
                                        id="pinfl"
                                        {...register('pinfl')}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="phone_number">
                                        Номер телефона
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите номер телефона"
                                        id="phone_number"
                                        {...register('phone_number')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="study_dir">
                                        Направление
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите направление"
                                        id="study_dir"
                                        {...register('study_dir')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="course">
                                        Курс
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите курс"
                                        id="course"
                                        {...register('course')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="father">
                                        Отец
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите имя отца"
                                        id="father"
                                        {...register('father')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="mother">
                                        Мама
                                    </InputLabel>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Введите имя мамы"
                                        id="mother"
                                        {...register('mother')}
                                    />
                                </Grid>
                                {groupCookie == ('admin' as string) && (
                                    <Grid
                                        item
                                        xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="login">
                                            Группа
                                        </InputLabel>
                                        <Select
                                            required
                                            displayEmpty
                                            fullWidth
                                            labelId="group-select"
                                            id="group-select"
                                            value={group}
                                            label="Группа"
                                            {...register('group', {
                                                required: true,
                                            })}
                                            onChange={handleChangeGroup}>
                                            <MenuItem value="">
                                                <em>Не выбрано</em>
                                            </MenuItem>
                                            {groupsDatas &&
                                                groupsDatas.length &&
                                                groupsDatas.map(
                                                    (item: IGroup) => {
                                                        return (
                                                            <MenuItem
                                                                key={item.id}
                                                                value={item.id}>
                                                                <em>
                                                                    {item.name}
                                                                </em>
                                                            </MenuItem>
                                                        );
                                                    },
                                                )}
                                        </Select>
                                    </Grid>
                                )}
                                <Grid
                                    item
                                    xs={6}>
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="birth_date">
                                        Дата рождения
                                    </InputLabel>
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
                                        Изображение
                                    </InputLabel>
                           `      <DragDrop files={files} setFiles={setFiles}/>
                               ` </Grid>
                            </Grid>
                            <Button
                                sx = {muiBtn}
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
