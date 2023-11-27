import TableComponentUsers from '../components/table/table-users.tsx';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../utils/https.ts';
import { Typography } from '@mui/material';
import ErrorPage from './error.tsx';
import { AddUserComponent } from '../components/addUser.tsx';
import { Loader } from '../components/loader.tsx';

export default function Admin() {
    const {
        data: usersDatas,
        isLoading: isUsersLoading,
        isError: isUsersError,
        error: usersError,
    } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    if (isUsersLoading) {
        return <Loader />;
    }

    if (isUsersError) {
        return <ErrorPage err={usersError} />;
    }

    if (!usersDatas?.length) {
        console.log('no data');
        return (
            <div className="pt-5 flex-col flex gap-5">
                <AddUserComponent />
                <Typography
                    variant="h4"
                    color="white">
                    Нет данных
                </Typography>
            </div>
        );
    }

    return (
        <div className="pt-3 flex flex-col gap-3">
            <AddUserComponent />
            <TableComponentUsers users={usersDatas} />
        </div>
    );
}
