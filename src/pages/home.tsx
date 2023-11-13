
import axios from "axios";
import {IStudent} from "../types/student.ts";
import {useEffect , useState ,useCallback} from "react";
import TableComponent from "../components/table/table.tsx";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export default function Home() {
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
                headers:{
                    'Authorization': token
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
    }, [getStudents, instance]);



    return(
        <TableComponent data={data}/>
    )
}




