import React , {useMemo} from "react";
import IndeterminateCheckbox from "../selectionCheck.tsx";
import {IStudent} from "../../types/student.ts";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Paper, TableBody,Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Filter from "../filter.tsx";
import {Pagination} from "../pagination.tsx";
import axios from "axios";
import { saveAs } from 'file-saver';

const instance = axios.create(
    {
        baseURL : "http://localhost:5000/"
    }
)

type Props  = {
    data : IStudent[];
}

const columns = [
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
            header: 'ID',
            accessorKey: 'id',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Fish',
            accessorKey: 'name',
            cell: (info) => info.getValue(),
        },
        {
            header: "Tug'ilgan sanasi",
            accessorKey: 'birth_date',
            cell: (info) => info.getValue(),
        },
        {
            header: "Tug'ilgan joyi",
            accessorKey: 'location',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Passport raqami',
            accessorKey: 'pass_number',
            cell: (info) => info.getValue(),
        },
        {
            header: 'PINFL',
            accessorKey: 'pinfl',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Telefon raqami',
            accessorKey: 'phone_number',
            cell: (info) => info.getValue(),
        },
        {
            header: "O'quv yonalishi",
            accessorKey: 'study_dir',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Kursi',
            accessorKey: 'course',
            cell: (info) => info.getValue(),
        },

        {
            header: 'Otasi',
            accessorKey: 'father',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Onasi',
            accessorKey: 'mother',
            cell: (info) => info.getValue(),
        },

        {
            header: 'Guruxi',
            accessorKey: 'group',
            cell: (info) => info.getValue(),
        },
    ];


export default function TableComponent(props : Props){
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const data = useMemo(() => props.data, [props.data]);

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
        getPaginationRowModel: getPaginationRowModel()
    });




    const postStudentsData = async (data:IStudent[]) =>{
        await instance<IStudent[]>({
            url : '/students',
            method: 'POST',
            data:  data,
            responseType: "blob"
        }).then(result => {console.log(result)
            saveAs(result.data, "result.xlsx")})
    }

    const handleRowSelectionData = async () =>{
        const students:IStudent[] = []

        for (let i = 0 ; i < table.getSelectedRowModel().flatRows?.length ; i++){

            students.push(table.getSelectedRowModel().flatRows[i].original)
        }

        console.log(students)

        await  postStudentsData(students);
    }


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

            {/*<div>*/}
            {/*    <button*/}
            {/*        className="border rounded p-2 mb-2"*/}
            {/*        onClick={() => rerender()}>*/}
            {/*        Force Rerender*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={handleRowSelectionData}>
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
    )

}