
import {useNavigate} from "react-router-dom";
import TableComponentUsers from "../components/table/table-users.tsx";
import { useQuery } from "@tanstack/react-query";
import {getUsers} from "../utils/https.ts";
import {useState} from "react";

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
    return(
           <TableComponentUsers users={usersDatas}/>
    )
}




