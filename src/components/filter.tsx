import { TextField } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';

export default function Filter({
    column,
}: {
    column: Column<any, any>;
    table: Table<any>;
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
