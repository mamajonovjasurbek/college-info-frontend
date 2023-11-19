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
import {Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button} from "@mui/material";

import Filter from "../filter.tsx";
import {Pagination} from "../pagination.tsx";
import axios from "axios";
// @ts-ignore
import { saveAs } from 'file-saver';
import Cookies from "universal-cookie";
import {tableCellStyle, tableHeaderStyle} from "../../styles/mui-styles.ts";
import {queryClient} from "../../main.tsx";


// rgb(231, 246, 242)
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
        header: 'ФИШ',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
    },
    {
        header: "Дата рождения",
        accessorKey: 'birth_date',
        cell: (info) => info.getValue().String,
    },
    {
        header: "Место рождения",
        accessorKey: 'location',
        cell: (info) => info.getValue(),
    },
    {
        header: 'Номер паспорта',
        accessorKey: 'pass_number',
        cell: (info) => info.getValue(),
    },
    {
        header: 'ПИНФЛ',
        accessorKey: 'pinfl',
        cell: (info) => info.getValue(),
    },
    {
        header: 'Номер телефона',
        accessorKey: 'phone_number',
        cell: (info) => info.getValue(),
    },
    {
        header: "Направление",
        accessorKey: 'study_dir',
        cell: (info) => info.getValue(),
    },
    {
        header: 'Курс',
        accessorKey: 'course',
        cell: (info) => info.getValue(),
    },

    {
        header: 'Отец',
        accessorKey: 'father',
        cell: (info) => info.getValue(),
    },
    {
        header: 'Мама',
        accessorKey: 'mother',
        cell: (info) => info.getValue(),
    },

    {
        header: 'Группа',
        accessorKey: 'group',
        cell: (info) => info.getValue(),
    },
];




export default function TableComponentStudents(props : Props){
    const [rowSelection, setRowSelection] = React.useState({});
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
        const cookies = new Cookies();
        const token = cookies.get("Authorization")
        
        await instance<IStudent[]>({
            url : '/students/excel',
            method: 'POST',
            data:  data,
            headers: {
                "Authorization" : `Bearer ${token}`
            },  
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

    const reloadTable = () =>{
        queryClient.invalidateQueries({
            queryKey: ["students"],
        });
    }


    return (
        <div>
            <div className="h-2" />
            <span className="flex items-center gap-4 mb-4 text-dark-bg-text">
                    Перейти на страницу:

                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="min-w-fit px-2  h-8 bg-dark-bg-lite  text-dark-bg"
                    />
                <select
                    className=" w-auto px-2 h-8 bg-dark-bg-lite text-dark-bg"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option
                            key={pageSize}
                            value={pageSize}>
                            Показать : {pageSize}
                        </option>
                    ))}
                </select>
                <Button
                    variant = "contained"
                    onClick={handleRowSelectionData}>
                    Скачать Excel
                </Button>
                 <Button
                     variant = "contained"
                     onClick={reloadTable}>
                    Обновить таблицу
                </Button>
                </span>
            
            <TableContainer
            variant="outlined" component={Paper}>
                <Table >
                    <TableHead >
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
                                                    <div className='text-center uppercase font-bold'>
                                                        {flexRender(
                                                            header.column.columnDef
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
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                            sx={tableCellStyle}
                                            key={cell.id}>
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

        </div>
    )

}