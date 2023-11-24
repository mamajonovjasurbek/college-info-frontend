import TableComponentStudents from '../components/table/table-student.tsx';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '../utils/https.ts';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorPage from './error.tsx';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

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
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        if (error?.response?.status === 401) {
            navigate('/');
        }
        return <ErrorPage err={error} />;
    }

    if (!datas?.length) {
        return (
            <Typography
                variant="h4"
                color="white">
                Нет данных
            </Typography>
        );
    }

    return <TableComponentStudents data={datas} />;
}
