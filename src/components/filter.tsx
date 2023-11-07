import { TextField } from '@mui/material';

export default function Filter({
    column,
}: {
    column: Column<any, any>;
    table: Table<any>;
}) {
    return (
        <TextField
            id="outlined-basic"
            value={(column.getFilterValue() ?? '') as string}
            variant="outlined"
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    );
}
