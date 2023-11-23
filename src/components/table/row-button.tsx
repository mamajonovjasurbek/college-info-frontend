import { Button, ButtonPropsColorOverrides } from '@mui/material';
import { Dispatch, SetStateAction, memo } from 'react';
import { IStudent } from '../../types/student';
import { IUser } from '../../types/user';
import { Row } from '@tanstack/react-table';
import { OverridableStringUnion } from '@mui/types';

interface IProps {
    setShow: Dispatch<SetStateAction<boolean>>;
    row: Row<IStudent> | Row<IUser>;
    setID: Dispatch<SetStateAction<string>>;
    name: string;
    color?: OverridableStringUnion<
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning',
        ButtonPropsColorOverrides
    >;
}
export const TableRowButton = memo((props: IProps) => {
    return (
        <Button
            color={props.color}
            onClick={() => {
                props.setShow(true);
                props.setID(props.row.getValue('id'));
            }}
            variant="contained">
            {props.name}
        </Button>
    );
});
