/* eslint-disable react-refresh/only-export-components */
import {
    AlertColor,
    Box,
    Button,
    CircularProgress, Grid, Input,
    InputLabel,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import {Dispatch, SetStateAction, memo, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {
    getStudentByID, updateStudentByID, updateStudentImage,
} from '../../utils/https';
import { SimpleSnackbar } from '../snackbar';
import {IStudent, IUpdateStudent} from '../../types/student';
import { queryClient } from '../../main';
import {DragDrop} from "../dragDrop.tsx";
import {muiBtn} from "../../styles/mui-styles.ts";

interface IProps {
    show: boolean;
    id: string;
    showHandler: Dispatch<SetStateAction<boolean>>;
    makeQuery: boolean;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    maxHeight: "calc(100vh - 210px)",
    overflowY: "auto",
};

export const StudentUpdateModal = memo((props: IProps) => {
    const {
        data: studentData,
        isLoading: isGetStudentLoading,
        isError: isGetStudentError,
    } = useQuery({
        queryKey: ['student', props.id],
        queryFn: () => getStudentByID(props.id),
        enabled: props.makeQuery,
    });

    const { mutate, isError, isPending } = useMutation({
        mutationFn: updateStudentByID,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students' ] ,
            });
            queryClient.invalidateQueries({
                queryKey: ['notifications' ] ,
            });
            handleClose();
            setSnackMessage('Данные пользователя изменены успешно');
            setSnackType('success');
            setSnack(true);
        },
    });


    const { mutate : mutateUpdateImage , isPending: isErrorUpdateImage,
                    isError: isPendingUpdateImage } = useMutation({
        mutationFn: updateStudentImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['student'] ,
            });
            setSnackMessage('Изображение изменено успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const [files, setFiles] = useState<(File & {preview:string})[]>([]);

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const { register, handleSubmit, reset } = useForm<IStudent>();

    const handleClose = () => {
        props.showHandler(false);
        setFiles([])
        reset();
    };

    const onSubmit = (data: IUpdateStudent) => {
        // @ts-ignore
        data.id = studentData?.id;
        mutate(data);
    };

    useEffect(() => {
        if (isError || isGetStudentError  || isErrorUpdateImage) {
            setSnackMessage('Ошибка при изменении данных студента');
            setSnackType('error');
            setSnack(true);
        }
    }, [isError, isGetStudentError, isErrorUpdateImage]);

    useEffect(() => {
        if (files.length > 0 && studentData?.id) {
            const formData = new FormData();
            formData.append('id', studentData.id);
            formData.append('file', files[0]);

            mutateUpdateImage(formData);
        }
    }, [files, studentData?.id]); // Добавлено studentData?.id

    return (
        <>
            <SimpleSnackbar
                show={snack}
                handleOpen={setSnack}
                message={snackMessage}
                type={snackType}
            />
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <>
                    {(isPending || isGetStudentLoading  || isPendingUpdateImage) && (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {studentData && (
                        <Box sx={style}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="border-2 p-10 rounded-lg flex flex-col gap-6">
                                <Typography
                                    variant="h5"
                                    className="text-dark text-center">
                                    Изменение данных
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="location">
                                            ФИО
                                        </InputLabel>
                                        <TextField
                                            required={true}
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.name}
                                            placeholder="Введите место жительства"
                                            id="location"
                                            {...register('name')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="location">
                                            Дата рождения
                                        </InputLabel>
                                        <Input
                                            fullWidth
                                            type="date"
                                            className="date"
                                            defaultValue={studentData.birth_date}
                                            placeholder="Введите место жительства"
                                            id="location"
                                            {...register('birth_date')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="location">
                                            Место жительства
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.location}
                                            placeholder="Введите место жительства"
                                            id="location"
                                            {...register('location')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="pass_number">
                                            Номер паспорта
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.pass_number}
                                            placeholder="Введите номер паспорта"
                                            id="pass_number"
                                            {...register('pass_number')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="phone_number">
                                            Номер телефона
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.phone_number}
                                            placeholder="Введите номер телефона"
                                            id="phone_number"
                                            {...register('phone_number')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="study_dir">
                                            Направление
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.study_dir}
                                            placeholder="Введите направление"
                                            id="study_dir"
                                            {...register('study_dir')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="study_dir">
                                            Направление
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.study_dir}
                                            placeholder="Введите направление"
                                            id="study_dir"
                                            {...register('study_dir')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="study_dir">
                                            Мама
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.mother}
                                            placeholder="Введите направление"
                                            id="study_dir"
                                            {...register('mother')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="study_dir">
                                            Отец
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.father}
                                            placeholder="Введите направление"
                                            id="study_dir"
                                            {...register('father')}
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
                                <Grid
                                    item
                                >
                                    <InputLabel
                                        className="text-sky-500"
                                        htmlFor="birth_date">
                                        Текущее изображение
                                    </InputLabel>
                                    <div className="w-full flex justify-center">
                                        <img src={studentData.image.url != ""  ? studentData.image.url  : "/unknown-double.jpg"} alt="student-image"/>
                                    </div>
                                </Grid>
                                <Button
                                    type="submit"
                                    sx ={muiBtn}
                                    variant="contained">
                                    Изменить
                                </Button>
                            </form>
                        </Box>
                    )}
                </>
            </Modal>
        </>
    );
});
