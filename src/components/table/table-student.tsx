import { useMemo, useState } from 'react';
import IndeterminateCheckbox from '../selectionCheck.tsx';
import { IStudent } from '../../types/student.ts';
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
    Button,
    AlertColor,
    CircularProgress,
    Box,
} from '@mui/material';

import Filter from '../filter.tsx';
import { Pagination } from '../pagination.tsx';
import { tableCellStyle, tableHeaderStyle } from '../../styles/mui-styles.ts';
import { queryClient } from '../../main.tsx';
import { useMutation } from '@tanstack/react-query';
import { postStudentsData } from '../../utils/https.ts';
import SimpleSnackbar from '../snackbar.tsx';
import Loader from '../loader.tsx';

type Props = {
    data: IStudent[];
};

export default function TableComponentStudents(props: Props) {
    const [rowSelection, setRowSelection] = useState({});

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const { mutate, isPending, isError } = useMutation({
        mutationFn: postStudentsData,
        onSuccess: () => {
            setSnackMessage('Excel файл успешно создан');
            setSnackType('success');
            setSnack(true);
        },
    });

    const data = useMemo(() => props.data, [props.data]);

    const columns = useMemo<ColumnDef<IStudent>[]>(
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
                header: 'ФИШ',
                accessorKey: 'name',
                cell: (info) => info.getValue(),
            },

            {
                header: 'Дата рождения',
                accessorKey: 'birth_date',
                cell: (info) => info.getValue().String,
            },
            {
                header: 'Место рождения',
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
                header: 'Направление',
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
        ],
        [],
    );

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

    const handleRowSelectionData = async () => {
        const students: IStudent[] = [];

        for (let i = 0; i < table.getSelectedRowModel().flatRows?.length; i++) {
            students.push(table.getSelectedRowModel().flatRows[i].original);
        }

        console.log(students);

        mutate(students);
    };

    const reloadTable = () => {
        queryClient.invalidateQueries({
            queryKey: ['students'],
        });
    };

    if (isError) {
        setSnackMessage('Ошибка при содании excel файла');
        setSnackType('error');
        setSnack(true);
    }

    return (
        <div>
            <SimpleSnackbar
                show={snack}
                handleOpen={setSnack}
                message={snackMessage}
                type={snackType}
            />
            {isPending ? (
                <Loader />
            ) : (
                <div className="mt-6">
                    <span className="flex items-center gap-4 mb-4 text-dark-bg-text">
                        Перейти на страницу:
                        <input
                            type="number"
                            defaultValue={
                                table.getState().pagination.pageIndex + 1
                            }
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
                            variant="contained"
                            onClick={handleRowSelectionData}>
                            Скачать Excel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={reloadTable}>
                            Обновить таблицу
                        </Button>
                    </span>

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
                                                                    header
                                                                        .column
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
                                                                    table={
                                                                        table
                                                                    }
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
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <TableCell
                                                            sx={tableCellStyle}
                                                            key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
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
            )}
        </div>
    );
}
