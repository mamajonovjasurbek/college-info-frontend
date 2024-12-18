import { TextField } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';
import { IStudent } from '../types/student';
import { IUser } from '../types/user';
import {IGroup} from "../types/group.ts";

export default function Filter({
    column,
}: {
    column: Column<IStudent, unknown> | Column<IUser, unknown> | Column<IGroup, unknown>;
    table: Table<IStudent> | Table<IUser> | Table<IGroup>;
}) {
    return (
        <div>
            <TextField
                sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    minWidth: 150,
                }}
                variant="outlined"
                id="outlined-basic"
                value={(column.getFilterValue() ?? '') as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder={`Поиск...`}
                className="w-36 border shadow rounded"
            />
        </div>
    );
}
