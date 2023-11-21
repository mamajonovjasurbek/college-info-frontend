/* eslint-disable react-refresh/only-export-components */
import { Box, Button ,Modal, Typography } from '@mui/material';
import { useMutation} from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import {deleteUserById} from '../../utils/https';
import {queryClient} from "../../main.tsx";

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UsersDeleteModal(props: IProps) {
    const handleClose = () => props.showHandler(false);

    const { mutate } = useMutation({
        mutationFn: deleteUserById,
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            handleClose()
        }
    });

    const deleteHandler = () => {
        console.log(props.id);
        mutate(props.id)
    };

    return (
        <>
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>

                        <Typography variant="h5" className="text-dark-bg text-center">
                            Удалить пользователя
                        </Typography>

                        <div className='flex gap-2 justify-center mt-4'>
                        <Button
                            variant="contained"
                            color = "error"
                            onClick = {deleteHandler}
                            >
                            Да
                        </Button>
                        <Button
                            variant="contained"
                            onClick = {handleClose}
                            >
                            Нет
                        </Button>
                       
                        </div>
                </Box>
            </Modal>
        </>
    );
}
