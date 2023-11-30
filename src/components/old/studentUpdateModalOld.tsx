/* eslint-disable react-refresh/only-export-components */
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
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    fetchGroups,
    getStudentByID,
    updateStudentByID,
} from '../../utils/https';
import { SimpleSnackbar } from '../snackbar';
import { IStudent } from '../../types/student';
import { IGroup } from '../../types/group';
import { queryClient } from '../../main';

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
};

export const StudentUpdateModalOld = memo((props: IProps) => {
    const {
        data: studentData,
        isLoading: isGetStudentLoading,
        isError: isGetStudentError,
    } = useQuery({
        queryKey: ['students', props.id],
        queryFn: () => getStudentByID(props.id),
        enabled: props.makeQuery,
    });

    const {
        data: groupsDatas,
        isLoading: isGroupsLoading,
        isError: isGroupsError,
    } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
        enabled: props.makeQuery,
    });

    const { mutate, isError, isPending } = useMutation({
        mutationFn: updateStudentByID,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
            handleClose();
            setSnackMessage('Данные пользователя изменены успешно');
            setSnackType('success');
            setGroup('');
            setSnack(true);
        },
    });

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const { register, handleSubmit, reset } = useForm<IStudent>();

    const [group, setGroup] = useState('');

    const handleChangeGroup = (event: SelectChangeEvent) => {
        setGroup(event.target.value);
    };

    const handleClose = () => {
        props.showHandler(false);
        reset();
    };

    const onSubmit = (data: IStudent) => {
        console.log(data, props.id);

        if (data && props.id) {
            // @ts-ignore
            mutate({ id: props.id, data: data });
        }
    };

    if (isError || isGetStudentError || isGroupsError) {
        handleClose();
        setSnackMessage('Ошибка при изменении данных студента');
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
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <>
                    {isPending ||
                        isGetStudentLoading ||
                        (isGroupsLoading && (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ))}
                    {groupsDatas && studentData && (
                        <Box sx={style}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="border-2 p-10 rounded-lg flex flex-col gap-6">
                                <Typography
                                    variant="h5"
                                    className="text-dark-bg text-center">
                                    Изменение данных
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="location">
                                            Место жительства
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.data.location}
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
                                            defaultValue={studentData.data.pass_number}
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
                                            defaultValue={studentData.data.phone_number}
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
                                            defaultValue={studentData.data.study_dir}
                                            placeholder="Введите направление"
                                            id="study_dir"
                                            {...register('study_dir')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="course">
                                            Курс
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={studentData.data.course}
                                            placeholder="Введите курс"
                                            id="course"
                                            {...register('course')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputLabel
                                            className="text-sky-500"
                                            htmlFor="group">
                                            Группа
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="group-select"
                                            id="group-select"
                                            value={group}
                                            label="Группа"
                                            {...register('group', { required: true })}
                                            onChange={handleChangeGroup}>
                                            {...groupsDatas?.length &&
                                            groupsDatas.map((item: IGroup) => {
                                                return (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}>
                                                        <em>{item?.name}</em>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Button
                                    disabled={group == ''}
                                    type="submit"
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
