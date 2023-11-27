import { TextField } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';
import { IStudent } from '../types/student';
import { IUser } from '../types/user';

export default function Filter({
    column,
}: {
    column: Column<IStudent, unknown> | Column<IUser, unknown>;
    table: Table<IStudent> | Table<IUser>;
}) {
    return (
        <div>
            <TextField
                sx={{
                    width: '100%',
                    backgroundColor: 'rgb(231, 246, 242)',
                    minWidth: 150,
                }}
                variant="outlined"
                id="outlined-basic"
                value={(column.getFilterValue() ?? '') as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder={`Search...`}
                className="w-36 border shadow rounded"
            />
        </div>
    );
}
