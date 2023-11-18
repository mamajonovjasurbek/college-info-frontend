
import {useNavigate} from "react-router-dom";
import TableComponentUsers from "../components/table/table-users.tsx";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../utils/https.ts";

export default function Admin() {
    const navigate = useNavigate()
   
    const {data : datas, isLoading , isError} =  useQuery({
        queryKey: ["users"],
        queryFn : getUsers
    })


    if (isLoading) {
        return(
            <p>Loading...</p>
        )
    }
    if (isError){
        navigate('/login')
    }




    return(
        <TableComponentUsers data={datas}/>
    )
}




