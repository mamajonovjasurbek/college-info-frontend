import {Avatar, Container, Grid} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import {  NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
export const Header = () => {

    const cookies = new Cookies();
    const role = cookies.get("Role")
    console.log(role)
    return (
        <header className="pt-5 pb-5 bg-dark-bg-meddium">
            <Container fixed>
            <Grid container>
                <Grid item md={4}>
                    <SchoolIcon fontSize="large" sx={{ color: "#fff" }}/>
                </Grid>
                {role === 1  && (
                    <Grid item md={4} className="flex justify-center gap-4 text-white text-xl uppercase font-medium items-center">
                        <NavLink to={"/home"}>Студенты</NavLink>
                        <NavLink to={"/home/admin"}>Админ</NavLink>
                    </Grid>
                )}
                <Grid item md={4} className="text-end flex justify-end">
                    <Avatar alt="Remy Sharp" src="/image-w856.webp" />
                </Grid>
            </Grid>
            </Container>
        </header>
    );
};