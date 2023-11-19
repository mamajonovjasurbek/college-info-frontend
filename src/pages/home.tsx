
import TableComponentStudents from "../components/table/table-student.tsx";
import {useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../utils/https.ts";

export default function Home() {
    const {data : datas, isLoading , isError} =  useQuery({
        queryKey: ["students"],
        queryFn : getStudents
    })

    const navigate = useNavigate()


    if (isLoading) {
        return(
            <p>Loading...</p>
        )
    }
    if (isError){
        navigate('/')
    }


    return(
        <TableComponentStudents data={datas}/>
    )
    
}




