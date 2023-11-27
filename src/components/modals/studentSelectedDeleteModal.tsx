import { Dispatch, memo, SetStateAction, useState } from 'react';
import { AlertColor, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { deleteSelectedStudent } from '../../utils/https.ts';
import { queryClient } from '../../main.tsx';
import { SimpleSnackbar } from '../snackbar.tsx';
import { Row, Table } from '@tanstack/react-table';
import { IStudent } from '../../types/student.ts';

interface IProps {
    show: boolean;
    rows: Row<IStudent>[];
    showHandler: Dispatch<SetStateAction<boolean>>;
    table : Table<IStudent>
}

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


export const StudentSelectedDeleteModal  = memo(({ rows, show, showHandler , table }: IProps) =>{
    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const { mutate, isError, isPending } = useMutation({
        mutationFn: deleteSelectedStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
            handleClose();
            setSnackMessage('Студент удален успешно');
            setSnackType('success');
            setSnack(true);
        },
    });

    const handleClose = () => showHandler(false);

    const deleteHandler = () => {
        const ids : string[]  = []

        for (let i = 0; i < rows?.length; i++) {
            ids.push(rows[i]?.original?.id as string)
        }
        mutate(ids);
        table.toggleAllPageRowsSelected(false)
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
            <Button
                disabled = {rows?.length === 0}
                variant="contained"
                onClick = {() => showHandler(true)}
                color="error"
            >
                Удалить выбранных студентов
            </Button>
            <Modal
                open={show}
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
                            className="text-dark-bg text-center">
                            Удалить  {rows.length > 1  ? "студентов" : "студента"}
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
})