
import TableComponentStudents from "../components/table/table-student.tsx";
import {useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../utils/https.ts";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Home() {
    const {data : datas, isLoading , isError} =  useQuery({
        queryKey: ["students"],
        queryFn : getStudents
    })

    const navigate = useNavigate()


    if (isLoading) {
        return(
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    if (isError){
        navigate('/')
    }

    if(!datas?.length){
        return(
            <Typography variant='h4' color="white">Нет данных</Typography>
        )
    }


    return(
        <TableComponentStudents data={datas}/>
    )
    
}




