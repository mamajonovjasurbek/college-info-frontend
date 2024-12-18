import TableComponentUsers from '../components/table/table-users.tsx';
import { useQuery } from '@tanstack/react-query';
import { getUsers ,fetchGroups } from '../utils/https.ts';
import { Typography } from '@mui/material';
import ErrorPage from './error.tsx';
import { AddUserComponent } from '../components/addUser.tsx';
import { Loader } from '../components/loader.tsx';
import TableComponentGroups from "../components/table/table-groups.tsx";
import {AddGroupComponent} from "../components/addGroup.tsx";

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

    const {
        data: groupsData,
        isLoading: isGroupsLoading,
        isError: isGroupsError,
        error: groupsError,
    } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
    });

    if (isUsersLoading || isGroupsLoading) {
        return <Loader />;
    }

    if (isUsersError) {
        return <ErrorPage err={usersError} />;
    }

    if (isGroupsError) {
        return <ErrorPage err={groupsError} />;
    }

    if (!usersDatas?.length && !usersDatas?.length){
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

    if (!usersDatas?.length){
        return (
            <div className="pt-5 flex-col flex gap-5">
                <AddGroupComponent/>
                <TableComponentGroups groups={groupsData} />
            </div>
        );
    }

    if (!groupsData?.length){
        return (
            <div className="pt-5 flex-col flex gap-5">
                <AddUserComponent />
                <TableComponentUsers users={usersDatas} />
            </div>
        );
    }

    return (
        <div className="pt-3 flex flex-col gap-3">
            <AddUserComponent />
            <TableComponentUsers users={usersDatas} />
            <AddGroupComponent/>
            <TableComponentGroups groups={groupsData} />
        </div>
    );
}
