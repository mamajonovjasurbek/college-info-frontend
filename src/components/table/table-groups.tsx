import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Paper,
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import Filter from '../filter.tsx';
import { Pagination } from '../pagination.tsx';

import { useMemo } from 'react';
import { queryClient } from '../../main.tsx';
import { tableHeaderStyle, TableRowStyled} from '../../styles/mui-styles.ts';
import { TableHeader } from './table-header.tsx';
import {IGroup} from "../../types/group.ts";




type Props = {
    groups: IGroup[] | undefined;
};

export default function TableComponentGroups(props: Props) {
    const groupsData = useMemo(() => props.groups, [props.groups]);
    const reloadTable = () => {
        queryClient.invalidateQueries({
            queryKey: ['users'],
        });
    };

    const columns = useMemo<ColumnDef<IGroup>[]>(
        () => [
            {
                header: 'Идентификатор',
                accessorKey: 'id',
                cell: (info) => info.getValue(),
            },
            {
                header: 'Название',
                accessorKey: 'name',
                cell: (info) => info.getValue(),
            }
        ],
        [],
    );

    const table = useReactTable({
        data: groupsData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <div className="h-2" />
            <TableHeader
                table={table}
                reloadTable={reloadTable}
            />
            <TableContainer
                variant="outlined"
                component={Paper}>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableCell
                                            sx={tableHeaderStyle}
                                            size="medium"
                                            key={header.id}
                                            colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div className="text-center uppercase font-bold">
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </div>
                                                    {header.column.getCanFilter() ? (
                                                        <Filter
                                                            column={
                                                                header.column
                                                            }
                                                            table={table}
                                                        />
                                                    ) : null}
                                                </>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <TableRowStyled key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRowStyled>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination table={table} />
        </div>
    );
}
