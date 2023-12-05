import { Button } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { IStudent } from '../../types/student';
import { IUser } from '../../types/user';
import { muiBtn } from '../../styles/mui-styles.ts';

interface IProps {
    table: Table<IStudent> | Table<IUser>;
    handleRowSelectionData?: () => Promise<void>;
    reloadTable: () => void;
}

export const TableHeader = (props: IProps) => {
    return (
        <div className="flex items-center gap-4 mb-4 text-dark-bg-lite">
            Перейти на страницу:
            <input
                type="number"
                defaultValue={props.table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                    const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                    props.table.setPageIndex(page);
                }}
                className="min-w-fit px-2  h-8 bg-dark-bg-lite  text-dark-bg-text"
            />
            <select
                className=" w-auto px-2 h-8 bg-dark-bg-lite text-dark-bg-text"
                value={props.table.getState().pagination.pageSize}
                onChange={(e) => {
                    props.table.setPageSize(Number(e.target.value));
                }}>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option
                        key={pageSize}
                        value={pageSize}>
                        Показать : {pageSize}
                    </option>
                ))}
            </select>
            {props.handleRowSelectionData && (
                <Button
                    sx = {muiBtn}
                    variant="contained"
                    onClick={props.handleRowSelectionData}>
                    Скачать Excel
                </Button>
            )}
            <Button
                sx = {muiBtn}
                variant="contained"
                onClick={props.reloadTable}>
                Обновить таблицу
            </Button>
        </div>
    );
};
