
import axios from "axios";
import {IStudent} from "../types/student.ts";
import {useEffect , useState ,useCallback} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import TableComponentUsers from "../components/table/table-users.tsx";

export default function Admin() {
    const navigate = useNavigate()
    const [data ,setData] = useState<IStudent[]>([])
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
            const response  = await instance.get<IStudent[]>('/students' ,{
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




