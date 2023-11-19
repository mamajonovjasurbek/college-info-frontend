import {Box, Button, Input, InputLabel, MenuItem, Modal, Select, SelectChangeEvent} from "@mui/material";
import { useMutation , useQuery} from '@tanstack/react-query';
import {createUser, fetchGroups } from "../utils/https.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {IGroup} from "../types/group.ts";
import {ICreateUser} from "../types/user.ts";
import {queryClient} from "../main.tsx";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default  function AddUserComponent(){
    const {data : groupsDatas, isLoading : isGroupsLoading , isError : isGroupsError} =  useQuery({
        queryKey: ["groups"],
        queryFn : fetchGroups,
    })



    const { register, handleSubmit , reset  } = useForm<ICreateUser>();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        reset()
        setShow(false);
    }

    const { mutate } = useMutation({
        mutationFn: createUser,
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            handleClose()
        }
    });

    const navigate = useNavigate()

    const [role, setRole] = useState('');

    const [group, setGroup] = useState('');

    const [isGroupDisabled , setIsGroupDisabled] = useState(true);


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




    const onSubmit = (data) => {
        mutate(data)
    };

    if (isGroupsLoading ) {
        return(
            <p>Loading...</p>
        )
    }
    if (isGroupsError){
        navigate('/login')
    }


    return (
        <>
            <Button onClick={()=>{
                setShow(true)
            }} variant="contained">Добавить пользователя
            </Button>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border-sky-500 border-2 p-10 rounded-lg flex flex-col gap-6">
                        <h1 className="text-2xl text-center text-sky-500">
                            Создать пользователя
                        </h1>
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
                            <MenuItem val   ue={2}>Админ</MenuItem>
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