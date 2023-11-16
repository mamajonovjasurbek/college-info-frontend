
import axios from "axios";
import {useEffect , useState ,useCallback} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import TableComponentUsers from "../components/table/table-users.tsx";
import {IUser} from "../types/user.ts";

export default function Admin() {
    const navigate = useNavigate()
    const [data ,setData] = useState<IUser[]>([])
    const instance = axios.create(
        {
            baseURL : "http://localhost:5000/"
        }
    )
    const getStudents = useCallback(async () =>{
        try {

            const cookies = new Cookies();
            const token = cookies.get("Authorization")

            console.log(token)
            const response  = await instance.get<IUser[]>('/users' ,{
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }    
            })
            
            setData(response.data)

        }
        catch (error){
            console.log(error)
            navigate("/login")
        }

    } , [instance ,navigate])



    useEffect(() => {
        getStudents()
    }, []);


    

    return(
        <TableComponentUsers data={data}/>
    )
}




