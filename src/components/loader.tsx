import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
    return (
        <div className="fixed w-full h-full flex justify-center items-center inset-0">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}
