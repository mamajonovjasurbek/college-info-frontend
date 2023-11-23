import { Box, CircularProgress } from '@mui/material';
import { memo } from 'react';

export const Loader = memo(() => {
    return (
        <div className="fixed w-full h-full flex justify-center items-center inset-0">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
});
