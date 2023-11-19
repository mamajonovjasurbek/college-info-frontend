/* eslint-disable react-refresh/only-export-components */
import { Box, Button ,Modal } from '@mui/material';
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

                        <h1 className="text-2xl text-center text-sky-500">
                            Хотите удалить пользователя ?
                        </h1>

                        <Button
                            type="submit"
                            variant="contained"
                            onClick = {handleClose}
                            >
                            Нет
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick = {deleteHandler}
                            >
                            Да
                        </Button>
                </Box>
            </Modal>
        </>
    );
}
