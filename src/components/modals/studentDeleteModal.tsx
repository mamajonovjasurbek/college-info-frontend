/* eslint-disable react-refresh/only-export-components */
import {
    AlertColor,
    Box,
    Button,
    CircularProgress,
    Modal,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { deleteStudentByID } from '../../utils/https';
import { queryClient } from '../../main.tsx';
import { SimpleSnackbar } from '../snackbar.tsx';

interface IProps {
    show: boolean;
    id: string;
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
    p: 4,
};

export const StudentDeleteModal = memo((props: IProps) => {
    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const { mutate, isError, isPending } = useMutation({
        mutationFn: deleteStudentByID,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
            queryClient.invalidateQueries({
                queryKey: ['notifications' ] ,
            });
            handleClose();
            setSnackMessage('Студент удален успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const handleClose = () => props.showHandler(false);

    const deleteHandler = () => {
        mutate(props.id);
    };

    if (isError) {
        handleClose();
        setSnackMessage('Ошибка при удалении студента');
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
                {isPending ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={style}>
                        <Typography
                            variant="h5"
                            className=" text-center">
                            Удалить студента
                        </Typography>

                        <div className="flex gap-2 justify-center mt-4">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={deleteHandler}>
                                Да
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleClose}>
                                Нет
                            </Button>
                        </div>
                    </Box>
                )}
            </Modal>
        </>
    );
});
