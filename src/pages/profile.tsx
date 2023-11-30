import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button, CircularProgress, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getStudentByID, getStudentImageByID} from "../utils/https.ts";
import {useQuery} from "@tanstack/react-query";
import ErrorPage from "./error.tsx";
import {Loader} from "../components/loader.tsx";
export default function ProfilePage() {
    const navigate  = useNavigate()
    const {id} = useParams()
    console.log(id)

    const {
        data: studentData,
        isLoading: isGetStudentLoading,
        isError: isGetStudentError,
        error : getStudentError
    } = useQuery({
        queryKey: ['students', id],
        queryFn: () => getStudentByID(id as string ),
    });

    const {
        data: imageData,
        isLoading: isImageLoading,
        isError: isImageError,
        error : imageError
    } = useQuery({
        queryKey: ['image' , id] ,
        queryFn: () => getStudentImageByID(id as string),
    });

    if(isGetStudentError || isImageError){
        <ErrorPage err={getStudentError || imageError }/>
    }
    if(isGetStudentLoading){
        <Loader/>
    }

    console.log(studentData)

    return (
        <Box className="flex min-w-screen min-h-screen justify-center">
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    mx: 'auto',
                    width: '100%',

                    py: {
                        xs: 2,
                        md: 3,
                    },
                }}>
                {studentData && (
                    <Card>
                        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button variant="contained" color="info" onClick={() => navigate("/home")}>
                                <ArrowBackIcon />
                            </Button>
                            <Typography variant="h6">Данные</Typography>
                        </Box>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
                            <Stack
                                direction="column"
                                spacing={1}>
                                {isImageLoading ? (
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    )
                                    :(
                                        <AspectRatio
                                            ratio="1"
                                            maxHeight={200}
                                            sx={{
                                                flex: 1,
                                                minWidth: 120,
                                                borderRadius: '100%',
                                            }}>
                                            <img
                                                src={imageData && imageData.size > 0   ? URL.createObjectURL(imageData) : "/unknown.jpg"}

                                                loading="lazy"
                                                alt=""
                                            />
                                        </AspectRatio>
                                    )
                                }
                            </Stack>
                            <Stack
                                spacing={2}
                                sx={{ flexGrow: 1 }}>
                                <div className="flex justify-between gap-2">
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Имя</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.name && studentData.data.name !== "" ? studentData.data.name : "Нет данных"}
                                        </Box>
                                    </Stack>
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Дата рождения</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.birth_date.string && studentData.data.birth_date.string !== "" ? studentData.data.birth_date.string : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Место рождения</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.location && studentData.data.location !== "" ? studentData.data.location : "Нет данных"}
                                        </Box>
                                    </Stack>
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Номер паспорта</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.pass_number && studentData.data.pass_number !== "" ? studentData.data.pass_number : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <div className="flex justify-between gap-2">

                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>ПИНФЛ</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.pinfl && studentData.data.pinfl !== "" ? studentData.data.pinfl : "Нет данных"}
                                        </Box>
                                    </Stack>
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Номер телефона</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.phone_number && studentData.data.phone_number !== "" ? studentData.data.phone_number : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <div className="flex justify-between gap-2">

                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Направление</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.study_dir && studentData.data.study_dir !== "" ? studentData.data.study_dir : "Нет данных"}
                                        </Box>
                                    </Stack>
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Курс</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.course && studentData.data.course !== "" ? studentData.data.course : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <div className="flex justify-between gap-2">

                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Отец</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.father && studentData.data.father !== ""  ? studentData.data.father : "Нет данных"}
                                        </Box>
                                    </Stack>
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Мама</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.mother && studentData.data.mother !== "" ? studentData.data.mother : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <Stack
                                        spacing={1}
                                        className="flex-1">
                                        <FormLabel>Группа</FormLabel>
                                        <Box className="pt-2 pb-2 pl-3 pr-8 border-2 rounded">
                                            {studentData.data.group && studentData.data.group !== "" ? studentData.data.group : "Нет данных"}
                                        </Box>
                                    </Stack>
                                </div>
                                <Link className="w-full" to="/home" ><Button fullWidth variant="contained">Назад</Button></Link>
                            </Stack>
                        </Stack>
                    </Card>
                )}
            </Stack>
        </Box>
    );
}
