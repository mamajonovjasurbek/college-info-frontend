import {
    Column,
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
// @ts-ignore
import { saveAs } from 'file-saver';
import React, { useMemo, useState } from "react";
import UserUpdateModal from "../modals/usersUpdateModal.tsx";
import UsersDeleteModal from "../modals/usersDeleteModal.tsx";
import AddUserComponent from "../addUser.tsx";
import {queryClient} from "../../main.tsx";


function changeRoleToString (role:number) {
    if (role === 1){
        return "Супер Админ"
    }
    if (role === 2){
        return "Админ"
    }
    if (role === 3){
        return "Учитель"
    }
}

function changeGroupString(group : string){
    if (group === "admin"){
        return "Все группы"
    }else {
        return group
    }
}

type Props  = {
    users : IUser[];
}

export default function TableComponentUsers(props : Props){

    const userData = useMemo(() => props.users, [props.users]);

    const [showModal , setShowModal] = useState(false)

    const [userID , setUserID] = useState("")

    const [deleteModal , setDeleteModal] = useState(false);

    const reloadTable = () =>{
        queryClient.invalidateQueries({
            queryKey: ["users"],
        });
    }

    const columns = React.useMemo<Column<IUser>[]>(
        () => [
            {
                header: 'Идентификатор',
                accessorKey: 'id',
                cell: (info) => info.getValue(),
            },
            {
                header: 'Логин',
                accessorKey: 'login',
                cell: (info) => info.getValue(),
            },
            {
                header: "Роль",
                accessorKey: 'role_id',
                cell: (info) => changeRoleToString(info.getValue()),
            },
            {
                header: "Группа",
                accessorKey: 'group_id',
                cell: (info) => changeGroupString(info.getValue()),
            },
            {
                header: "Редактирование",
                cell: ({row}) => (
                    <div className="flex items-center justify-center gap-2">
                        <Button onClick={()=>{
                            setShowModal(true)
                            setUserID(row.getValue("id"))
                        }} variant="contained">Изменить
                        </Button>
                        <Button color="error"  onClick={()=>{
                            setDeleteModal(true)
                            setUserID(row.getValue("id"))
                        }} variant="contained">Удалить
                        </Button>
                    </div>),
            }

        ],
        [userData]
    );

    const table = useReactTable({
        data : userData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });


    return (
        <div>
            <UsersDeleteModal show={deleteModal} id={userID} showHandler={setDeleteModal}/>
            <UserUpdateModal show={showModal} id={userID} showHandler = {setShowModal}/>
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
                            Показать: {pageSize}
                        </option>
                    ))}
                </select>
                <AddUserComponent/>
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