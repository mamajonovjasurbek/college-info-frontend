import { AlertColor, Box, Button, CircularProgress, Input, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography} from "@mui/material";
import { useMutation , useQuery} from '@tanstack/react-query';
import {createUser, fetchGroups } from "../utils/https.ts";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {IGroup} from "../types/group.ts";
import {ICreateUser} from "../types/user.ts";
import {queryClient} from "../main.tsx";
import {  modalStyle } from "../styles/mui-styles.ts";
import ErrorPage from "../pages/error.tsx";
import SimpleSnackbar from "./snackbar.tsx";



export default  function AddUserComponent(){
    
    const [snack , setSnack] = useState(false)

    const [snackType , setSnackType] = useState<AlertColor>("success") 

    const [snackMessage, setSnackMessage] = useState("")

    const { register, handleSubmit , reset  } = useForm<ICreateUser>();

    const [show, setShow] = useState(false);

    const [role, setRole] = useState('');

    const [group, setGroup] = useState('');

    const [isGroupDisabled , setIsGroupDisabled] = useState(true);
    
    const {data : groupsDatas, isLoading : isGroupsLoading , isError : isGroupsError ,error : groupsError} =  useQuery({
        queryKey: ["groups"],
        queryFn : fetchGroups,
    })

    const { mutate , isError} = useMutation({
        mutationFn: createUser,
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            handleClose()
            setSnackMessage("Пользователь добавлен успешно")
            setSnackType("success")
            setSnack(true)

        }
    });

    

    const handleClose = () => {
        reset()
        setShow(false);
    }

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);

        if (Number(event.target.value) === 3){
            setIsGroupDisabled(false)
        }else{
            setGroup("")
            setIsGroupDisabled(true)
        }
    };

    const handleChangeGroup = (event: SelectChangeEvent) => {
        setGroup(event.target.value);
    };

    const onSubmit = (data :ICreateUser) => {
        mutate(data)
    };

    if (isGroupsLoading ) {
        return(
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isGroupsError){
        return(
            <ErrorPage err={groupsError}/>
        )
    }

    if(isError) {
        handleClose()
        setSnackMessage("Ошибка при создании пользователя")
        setSnackType("error")
        setSnack(true)
    }

    return (
        <>
            <SimpleSnackbar show= {snack} handleOpen={setSnack} message={snackMessage} type={snackType}/>
            <Button sx={{
                width:"fit-content"
            }} onClick={()=>{
                setShow(true)
            }} variant="contained">Добавить пользователя
            </Button>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border-2 p-6 rounded-lg flex flex-col gap-6">
                        <Typography variant="h5" className="text-dark-bg">
                            Создать пользователя
                        </Typography>
                        <InputLabel
                            htmlFor="login">
                            Имя
                        </InputLabel>
                        <Input
                            placeholder="Введите имя"
                            id="name"
                            {...register('name', { required: true })}
                        />
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Логин
                        </InputLabel>
                        <Input
                            placeholder="Введите логин"
                            id="login"
                            {...register('login', { required: true })}
                        />
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Пароль
                        </InputLabel>
                        <Input
                            placeholder="Введите пароль"
                            id="password"
                            {...register('password', { required: true })}
                        />
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Роль
                        </InputLabel>
                        <Select
                            labelId="role-select"
                            id="role-select"
                            value={role}
                            label="Роль"
                            {...register('role_id', { required: true })}
                            onChange={handleChangeRole}
                        >
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            <MenuItem value={2}>Админ</MenuItem>
                            <MenuItem value={3}>Учитель</MenuItem>
                        </Select>
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="login">
                            Группа
                        </InputLabel>
                        <Select
                            labelId="group-select"
                            id="group-select"
                            value={group}
                            label="Группа"
                            {...register('group_id')}
                            onChange={handleChangeGroup}
                            disabled={isGroupDisabled}
                        >
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            {groupsDatas.length && groupsDatas.map((item : IGroup) =>{
                                return(
                                    <MenuItem key={item.id} value={item.id}>
                                        <em>{item.name}</em>
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <Button
                            type="submit"
                            variant="contained">
                            Создать
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}