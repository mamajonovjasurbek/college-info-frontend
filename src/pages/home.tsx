import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import IndeterminateCheckbox from '../components/selectionCheck';
import Filter from '../components/filter';
import { Person } from '../types/person';
import { Pagination } from '../components/pagination';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { DefaultData } from '../data';



export default function Home() {
    const rerender = React.useReducer(() => ({}), {})[1];

    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');

    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },

            {
                header: 'Fish',
                accessorKey: 'fish',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Tug'ilgan sanasi",
                accessorKey: 'birthDate',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Tug'ilgan joyi",
                accessorKey: 'location',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Passport raqami',
                accessorKey: 'passportNumber',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Telefon raqami',
                accessorKey: 'phoneNumber',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "O'quv yonalishi",
                accessorKey: 'eduDir',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Kursi',
                accessorKey: 'course',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Guruxi',
                accessorKey: 'group',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Otasi',
                accessorKey: 'father',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: 'Onasi',
                accessorKey: 'mother',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
        ],
        [],
    );

    const [data, setData] = React.useState(DefaultData);

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-2">
            <div>
                <input
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="p-2 font-lg shadow border border-block"
                    placeholder="Search all columns..."
                />
            </div>
            <div className="h-2" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableCell
                                            key={header.id}
                                            colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div className='text-center uppercase font-bold'>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    </div>
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <Filter
                                                                column={
                                                                    header.column
                                                                }
                                                                table={table}
                                                            />
                                                        </div>
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
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination table={table} />

            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() => rerender()}>
                    Force Rerender
                </button>
            </div>

            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() => console.info('rowSelection', rowSelection)}>
                    Log `rowSelection` state
                </button>
            </div>
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() =>
                        console.info(
                            'table.getSelectedRowModel().flatRows',
                            table.getSelectedRowModel().flatRows,
                        )
                    }>
                    Log table.getSelectedRowModel().flatRows
                </button>
            </div>
        </div>
    );
}
