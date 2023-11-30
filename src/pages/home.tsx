import TableComponentStudents from '../components/table/table-student.tsx';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '../utils/https.ts';
import { Typography } from '@mui/material';
import ErrorPage from './error.tsx';
import { Loader } from '../components/loader.tsx';
import {AddStudent} from "../components/addStudent.tsx";
export default function Home() {
    const {
        data: datas,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['students'],
        queryFn: getStudents,
    });

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    if (isError) {
        return <ErrorPage err={error} />;
    }

    if (!datas?.length) {
        return (
            <div className="pt-3 flex flex-col gap-3">
                <AddStudent />
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
            <AddStudent />
            <TableComponentStudents data={datas} />
        </div>
    );
}
