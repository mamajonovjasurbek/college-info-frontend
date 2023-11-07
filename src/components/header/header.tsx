import {Avatar, Grid} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
export const Header = () => {
    return (
        <header className="pt-5 pb-5">
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <SchoolIcon fontSize="large"/>
                </Grid>
                <Grid item md={6} className="text-end flex justify-end">
                    <Avatar alt="Remy Sharp" src="/image-w856.webp" />
                </Grid>
            </Grid>
        </header>
    );
};