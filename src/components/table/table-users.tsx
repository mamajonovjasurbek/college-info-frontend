import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {IUser} from "../../types/user.ts";
import {Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button} from "@mui/material";

import Filter from "../filter.tsx";
import {Pagination} from "../pagination.tsx";
import axios from "axios";
// @ts-ignore
import { saveAs } from 'file-saver';
import Cookies from "universal-cookie";
import { useMemo, useState } from "react";
import UserUpdateModal from "../modals/usersUpdateModal.tsx";


// rgb(231, 246, 242)
const instance = axios.create(
    {
        baseURL : "http://localhost:5000/"
    }
)

type Props  = {
    data : IUser[];
}

export default function TableComponentUsers(props : Props){
    const [rowSelection, setRowSelection] = useState({});

    const data = useMemo(() => props.data, [props.data]);

    const [showModal , setShowModal] = useState(false)

    const [userID , setUserID] = useState(0)

    const columns= [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Login',
            accessorKey: 'login',
            cell: (info) => info.getValue(),
        },
        {
            header: "Roli",
            accessorKey: 'role',
            cell: (info) => info.getValue(),
        },
        {
            header: "Gruppasi",
            accessorKey: 'group',
            cell: (info) => info.getValue(),
        },
        {
            header: "Редактирование",
            cell: ({row}) => (<div className="flex items-center justify-center"><Button onClick={()=>{
                setShowModal(true)
                setUserID(row.getValue("id"))
            }} variant="contained">Изменить</Button></div>),
        }
    
    ];

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




    const postStudentsData = async (data:IUser[]) =>{
        const cookies = new Cookies();
        const token = cookies.get("Authorization")
        
        await instance<IUser[]>({
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
        const students:IUser[] = []

        for (let i = 0 ; i < table.getSelectedRowModel().flatRows?.length ; i++){

            students.push(table.getSelectedRowModel().flatRows[i].original)
        }

        console.log(students)

        await  postStudentsData(students);
    }

    

    return (
        <div>
            <UserUpdateModal show={showModal} id={userID} showHandler = {setShowModal}/>
            <div className="h-2" />
            <span className="flex items-center gap-4 mb-4 text-dark-bg-text">
                    Betga o'tish:
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
                            Ko'rish {pageSize}
                        </option>
                    ))}
                </select>
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
                                            sx={{
                                                // backgroundColor: "rgba(255,255,255,1)",
                                                border : "1px solid rgb(34, 9, 44)",
                                                padding : 2,
                                                backgroundColor : "rgb(82, 109, 130)",
                                                color : "rgb(231, 246, 242)",
                                                // minWidth : 200
                                            }}
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
                                            sx={{
                                                // backgroundColor: "rgba(255,255,255,1)",
                                                border : "1px solid rgb(34, 9, 44)",
                                                padding : 2,
                                                backgroundColor : "rgb(157, 178, 191)",
                                                color : "rgb(39, 55, 77)"
                                            }}
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