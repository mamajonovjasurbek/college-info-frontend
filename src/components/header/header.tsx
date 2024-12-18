import {
    AlertColor,
    Badge,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { NavLink } from 'react-router-dom';
import React, { memo, useState } from 'react';
import ExitModal from '../modals/exitModal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useCookies } from 'react-cookie';
import {muiBtn} from "../../styles/mui-styles.ts";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchNotifications, viewNotifications} from "../../utils/https.ts";
import {Notification} from "../notification.tsx";
import {SimpleSnackbar} from "../snackbar.tsx";
import {queryClient} from "../../main.tsx";
import {INotification} from "../../types/notification.ts";

export const Header = memo(() => {
    const [exit, setExit] = useState(false);

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const [roleCookies] = useCookies(['role']);

    const [nameCookies] = useCookies(['name']);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const {data , isLoading , isError} = useQuery({
        queryKey : ["notifications"],
        queryFn : fetchNotifications,
    })

    const {mutate} = useMutation({
        mutationKey : ["notification"],
        mutationFn : viewNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            });
            handleClose();
            setSnackMessage('Уведомления очишены');
            setSnackType('success');
            setSnack(true);
        },
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewNotifications = () => {
        if (data && data?.length > 0){
            let reqData = []
            for (let i = 0 ; i < data.length ; i++){
                reqData.push(data[i].id)
            }
            console.log(reqData)

            mutate(reqData)
        }
    }

    if(isError){
        setSnackMessage('Ошибка при изменении данных студента');
        setSnackType('error');
        setSnack(true);
    }

    return (
        <header className="pt-5 pb-5 bg-dark-bg-meddium">
            <SimpleSnackbar
                show={snack}
                handleOpen={setSnack}
                message={snackMessage}
                type={snackType}
            />
            <Container fixed>
                <Grid container>
                    <Grid
                        item
                        md={roleCookies.role === 1 ? 4 : 6}>
                        <SchoolIcon
                            fontSize="large"
                            sx={{ color: '#fff' }}
                        />
                    </Grid>
                    {roleCookies.role === 1 && (
                        <Grid
                            item
                            md={4}
                            className="flex justify-center gap-4 text-white text-xl uppercase font-medium items-center">
                            <NavLink to={'/home'}>Студенты</NavLink>
                            <NavLink to={'/home/admin'}>Админ</NavLink>
                        </Grid>
                    )}
                    <Grid
                        item
                        md={roleCookies.role === 1 ? 4 : 6}
                        className="text-end flex justify-end gap-5 items-center">
                        <IconButton onClick={handleClick} aria-label="mail">
                            <Badge badgeContent={data?.length} color="success">
                                <NotificationsActiveIcon className="text-white" />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {isLoading ? (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                                ): (
                                <div className="max-h-[400px] w-fit overflow-y-scroll">
                                    {data && data.length ? data.map((item : INotification) =>{
                                        return(
                                            <MenuItem key={item.id} onClick={handleClose}><Notification data={item}/></MenuItem>
                                        )
                                    }) : "Нет уведомлений" }
                                </div>
                            )}
                            {data && data.length && (
                                <div className="flex p-3 justify-end">
                                    <Button onClick={handleViewNotifications} variant="contained"  color="inherit" className="mr-auto">Очистить все</Button>
                                </div>
                            )}
                        </Menu>
                        <Typography
                            variant="h5"
                            className="text-white text-center align-middle">
                            {nameCookies.name}
                        </Typography>

                        <Button
                            onClick={() => setExit(true)}
                            variant="contained"
                            sx = {muiBtn}
                            type="button"
                            className="text-white text-center">
                            <ExitToAppIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            {exit && (
                <ExitModal
                    show={exit}
                    showHandler={setExit}
                />
            )}
        </header>
    );
});
