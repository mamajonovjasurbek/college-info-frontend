
import {useNavigate} from "react-router-dom";
import TableComponentUsers from "../components/table/table-users.tsx";
import { useQuery } from "@tanstack/react-query";
import {getUsers} from "../utils/https.ts";

export default function Admin() {
    const navigate = useNavigate()

    const {data : usersDatas,isLoading : isUsersLoading , isError : isUsersError} =  useQuery({
        queryKey: ["users"],
        queryFn : getUsers
    })

    if (isUsersLoading ) {
        return(
            <p>Loading...</p>
        )
    }
    if (isUsersError){
        navigate('/login')
    }

    if(!usersDatas?.length){
        console.log("no data")
        return (
            <p>Нет данных</p>
        )
    }

    if (usersDatas?.length){
        return(
            <TableComponentUsers users={usersDatas}/>
        )
    }

}




