import { Typography } from '@mui/material';

interface IProps {
    err: Error | null;
}

function ErrorPage(props: IProps) {
    return (
        <div className="mt-8">
            <Typography
                variant="h3"
                color="white"
                align="center">
                {props.err?.name}
            </Typography>
            <Typography
                variant="h4"
                color="white"
                align="center">
                {props.err?.message}
            </Typography>
        </div>
    );
}
export default ErrorPage;
