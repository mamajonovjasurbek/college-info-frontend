import {SyntheticEvent , Dispatch , SetStateAction } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';


interface IProps{
    show : boolean
    handleOpen : Dispatch<SetStateAction<boolean>>;
    type : AlertColor
    message : string
}

export default function SimpleSnackbar(props : IProps) {

    const handleClose = (
        _event: SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        props.handleOpen(false);
    };


    return (
        <div>
                <Snackbar
                open={props.show}
                autoHideDuration={6000}
                onClose={handleClose}
                >
                <Alert
                    onClose={handleClose}
                    severity={props.type}
                    sx={{ width: '100%' ,color: "#333" , fontSize: "16px", backgroundColor : "fff" }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
