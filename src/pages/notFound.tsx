import { memo } from 'react';
import { Typography } from '@mui/material';

export const NotFound = memo(() =>{
    return(
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <Typography variant="h2" color="white" fontWeight="bold" >Нет такой страницы</Typography>
            <img src="/404.png" alt="404"/>
        </div>
    )
} );