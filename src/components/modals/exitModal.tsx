/* eslint-disable react-refresh/only-export-components */
import { Box, Button, Modal, Typography } from '@mui/material';
import {Dispatch, SetStateAction} from 'react';
import Cookies from 'universal-cookie';

interface IProps {
    show: boolean;
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

export default function ExitModal(props: IProps) {
    const cookies = new Cookies();

    const handleClose = () => props.showHandler(false);

    const exitHandler = () => {
        try {
            cookies.remove("Authorization" , {sameSite : "none" , secure : true});

            cookies.remove("role" , {sameSite : "none" , secure : true});

            cookies.remove("name" , {sameSite : "none" , secure : true});

            cookies.remove("group" , {sameSite : "none" , secure : true});

            cookies.remove("groupID" , {sameSite : "none" , secure : true});

            window.location.replace('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        className="text-center">
                        Хотите выйти
                    </Typography>

                    <div className="flex gap-2 justify-center mt-4">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={exitHandler}>
                            Да
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleClose}>
                            Нет
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
