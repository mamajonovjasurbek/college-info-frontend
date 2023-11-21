import { Button, Container, Grid, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import ExitModal from '../modals/exitModal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export const Header = () => {

    const [exit , setExit] = useState(false)
    
    const cookies = new Cookies();

    const role = cookies.get('role');

    const name = cookies.get('name');
    
    return (
        <header className="pt-5 pb-5 bg-dark-bg-meddium">
            <Container fixed>
                <Grid container>
                    <Grid
                        item
                        md={role === 1 ? 4 : 6}>
                        <SchoolIcon
                            fontSize="large"
                            sx={{ color: '#fff' }}
                        />
                    </Grid>
                    {role === 1 && (
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
                        md={role === 1 ? 4 : 6}
                        className="text-end flex justify-end gap-2 items-center">
                        <Typography
                            variant="h5"
                            className="text-white text-center align-middle">
                            {name}
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
