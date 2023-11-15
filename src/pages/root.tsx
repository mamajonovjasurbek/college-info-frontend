import {Header} from "../components/header/header.tsx";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

export const Root = () => {
    return (
        <div>
            <Header/>
            <Container  fixed>
                <Outlet/>
            </Container>
        </div>
    );
};