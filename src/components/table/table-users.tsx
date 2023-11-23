import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { IUser } from '../../types/user.ts';
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

import { useMemo, useState } from 'react';
import { queryClient } from '../../main.tsx';
import { tableCellStyle } from '../../styles/mui-styles.ts';
import { UsersDeleteModal } from '../modals/usersDeleteModal.tsx';
import { UserUpdateModal } from '../modals/usersUpdateModal.tsx';
import { TableHeader } from './table-header.tsx';
import { TableRowButton } from './row-button.tsx';

function changeRoleToString(role: number | unknown) {
    if (role === 1) {
        return 'Супер Админ';
    }
    if (role === 2) {
        return 'Админ';
    }
    if (role === 3) {
        return 'Учитель';
    }
}

function changeGroupString(group: string | unknown) {
    if (group === 'admin') {
        return 'Все группы';
    } else {
        return group;
    }
}

type Props = {
    users: IUser[];
};

export default function TableComponentUsers(props: Props) {
    const userData = useMemo(() => props.users, [props.users]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [userID, setUserID] = useState<string>('');

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const reloadTable = () => {
        queryClient.invalidateQueries({
            queryKey: ['users'],
        });
    };

    const columns = useMemo<ColumnDef<IUser>[]>(
        () => [
            {
                header: 'Идентификатор',
                accessorKey: 'id',
                cell: (info) => info.getValue(),
            },
            {
                header: 'Имя',
                accessorKey: 'name',
                cell: (info) => info.getValue(),
            },
            {
                header: 'Логин',
                accessorKey: 'login',
                cell: (info) => info.getValue(),
            },
            {
                header: 'Роль',
                accessorKey: 'role_id',
                cell: (info) => changeRoleToString(info.getValue()),
            },
            {
                header: 'Группа',
                accessorKey: 'group_id',
                cell: (info) => changeGroupString(info.getValue()),
            },
            {
                header: 'Редактирование',
                cell: ({ row }) => (
                    <div className="flex items-center justify-center gap-2">
                        <TableRowButton
                            name="Изменить"
                            row={row}
                            setShow={setShowModal}
                            setID={setUserID}
                        />
                        <TableRowButton
                            name="Удалить"
                            color="error"
                            row={row}
                            setShow={setDeleteModal}
                            setID={setUserID}
                        />
                    </div>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: userData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <UsersDeleteModal
                show={deleteModal}
                id={userID}
                showHandler={setDeleteModal}
            />
            <UserUpdateModal
                show={showModal}
                id={userID}
                showHandler={setShowModal}
            />
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
                                            sx={{
                                                // backgroundColor: "rgba(255,255,255,1)",
                                                border: '1px solid rgb(34, 9, 44)',
                                                padding: 2,
                                                backgroundColor:
                                                    'rgb(82, 109, 130)',
                                                color: 'rgb(231, 246, 242)',
                                                // minWidth : 200
                                            }}
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
    );
}
