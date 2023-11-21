import { useNavigate } from 'react-router-dom';
import TableComponentUsers from '../components/table/table-users.tsx';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../utils/https.ts';
import AddUserComponent from '../components/addUser.tsx';
import { AlertColor, Box, CircularProgress, Typography } from '@mui/material';
import SimpleSnackbar from '../components/snackbar.tsx';
import { useState } from 'react';

export default function Admin() {
    const navigate = useNavigate();

    const [snack , setSnack] = useState(false)

    const [snackType , setSnackType] = useState<AlertColor>("success") 

    const [snackMessage, setSnackMessage] = useState("")

    const {
        data: usersDatas,
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    if (isUsersLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isUsersError) {
        navigate('/');
    }

    if (!usersDatas?.length) {
        console.log('no data');
        return (
            <div className='pt-5 flex-col flex gap-5'>
                <SimpleSnackbar show= {snack} handleOpen={setSnack} message={snackMessage} type={snackType}/>
                <AddUserComponent handleSnackOpen = {setSnack} handleSnackMessage={setSnackMessage} handleSnackType={setSnackType} />
                <Typography variant='h4' color="white">Нет данных</Typography>
            </div>
        );
    }

    return (
        <div className='pt-5 flex flex-col gap-5'>
            <SimpleSnackbar show= {snack} handleOpen={setSnack} message={snackMessage} type={snackType}/>
            <AddUserComponent handleSnackOpen = {setSnack} handleSnackMessage={setSnackMessage} handleSnackType={setSnackType}/>
            <TableComponentUsers users={usersDatas} />
        </div>
    );
}
