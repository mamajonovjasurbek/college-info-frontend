import { useMemo, useState } from 'react';
import { IBirthDate, IStudent } from '../../types/student.ts';
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
    AlertColor,
} from '@mui/material';

import Filter from '../filter.tsx';
import { Pagination } from '../pagination.tsx';
import { tableCellStyle, tableHeaderStyle } from '../../styles/mui-styles.ts';
import { queryClient } from '../../main.tsx';
import { useMutation } from '@tanstack/react-query';
import { postStudentsData } from '../../utils/https.ts';
import { SimpleSnackbar } from '../snackbar.tsx';
import { IndeterminateCheckbox } from '../selectionCheck.tsx';
import { TableHeader } from './table-header.tsx';
import { Loader } from '../loader.tsx';
import { TableRowButton } from './row-button.tsx';
import { StudentUpdateModal } from '../modals/studentUpdateModal.tsx';
import { StudentDeleteModal } from '../modals/studentDeleteModal.tsx';
import { StudentSelectedDeleteModal } from '../modals/studentSelectedDeleteModal.tsx';
import { cutDate } from '../../utils/helper-functions.ts';

type Props = {
    data: IStudent[];
};

export default function TableComponentStudents(props: Props) {
    const [rowSelection, setRowSelection] = useState({});

    const [snack, setSnack] = useState(false);

    const [snackType, setSnackType] = useState<AlertColor>('success');

    const [snackMessage, setSnackMessage] = useState('');

    const [showModal, setShowModal] = useState<boolean>(false);

    const [studentID, setStudentID] = useState<string>('');

    const [makeQuery, setMakeQuery] = useState(false);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const [deleteSelectedModal, setDeleteSelectedModal] =
        useState<boolean>(false);

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
                            checked: table.getIsAllPageRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange:
                                table.getToggleAllPageRowsSelectedHandler(),
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
                header: 'Идентификатор',
                accessorKey: 'id',
                cell: (info) => info.getValue(),
            },
            {
                header: 'ФИШ',
                accessorKey: 'name',
                cell: (info) => info.getValue(),
            },

            {
                header: 'Дата рождения',
                accessorKey: 'birth_date',
                cell: (info) =>
                    cutDate(info.getValue<IBirthDate>().String as string),
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
            {
                header: 'Редактирование',
                cell: ({ row }) => (
                    <div className="flex items-center justify-center gap-2">
                        <TableRowButton
                            name="Изменить"
                            row={row}
                            setShow={setShowModal}
                            setID={setStudentID}
                            makeQuery={setMakeQuery}
                        />
                        <TableRowButton
                            name="Удалить"
                            color="error"
                            row={row}
                            setShow={setDeleteModal}
                            setID={setStudentID}
                        />
                    </div>
                ),
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
        table.toggleAllPageRowsSelected(false);
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
            <StudentUpdateModal
                show={showModal}
                id={studentID}
                showHandler={setShowModal}
                makeQuery={makeQuery}
            />
            <StudentDeleteModal
                show={deleteModal}
                id={studentID}
                showHandler={setDeleteModal}
            />
            <StudentSelectedDeleteModal
                show={deleteSelectedModal}
                showHandler={setDeleteSelectedModal}
                table={table}
                rows={table.getSelectedRowModel().flatRows}
            />
            {isPending ? (
                <Loader />
            ) : (
                <div className="mt-6">
                    <TableHeader
                        table={table}
                        reloadTable={reloadTable}
                        handleRowSelectionData={handleRowSelectionData}
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
