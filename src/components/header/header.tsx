import { Button, Container, Grid, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ExitModal from '../modals/exitModal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useCookies } from 'react-cookie';
export const Header = () => {

    const [exit , setExit] = useState(false)
    
    const [roleCookies] = useCookies(["role"]);

    const [nameCookies] = useCookies(["name"]);

    
    return (
        <header className="pt-5 pb-5 bg-dark-bg-meddium">
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
                        className="text-end flex justify-end gap-2 items-center">
                        <Typography
                            variant="h5"
                            className="text-white text-center align-middle">
                            {nameCookies.name}
                        </Typography>
                        <Button
                            onClick={() => setExit(true)}
                            variant="contained"
                            type ="button" 
                            className="text-white text-center">
                            <ExitToAppIcon/>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            {exit && <ExitModal show={exit} showHandler={setExit}/>}            
        </header>
    );
};
