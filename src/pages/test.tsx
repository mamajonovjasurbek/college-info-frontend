import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ITest } from '../types/student.ts';
import { useMutation } from '@tanstack/react-query';
import { testForm } from '../utils/https.ts';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const dropzoneStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    marginTop: '2rem',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border 0.24s ease-in-out',
    cursor: 'pointer',
};

const activeDropzoneStyle = {
    borderColor: '#00adb5',
};

const DropzoneText = {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
};

const ImagePreview = {
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    borderRadius: '2px',
};

const FileName = {
    display: 'flex',
    fontSize: '14px',
    marginTop: '8px',
};

export default function Test() {
    const { register, handleSubmit } = useForm<ITest>();
    const [files, setFiles] = useState([]);

    const { mutate } = useMutation({
        mutationFn: testForm,
    });

    const onSubmit = (data: ITest) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('image', files[0]);
        mutate(formData);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            ),
        );
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxSize: 1024 * 1024 * 5,
        maxFiles: 1,
    });

    const fileList = files.map((file) => (
        <li key={file.name}>
            <img
                style={ImagePreview}
                src={file.preview}
                alt={file.name}
            />
            <span style={FileName}>{file.name}</span>
        </li>
    ));
    return (
        <div className="pt-3 flex flex-col gap-3">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 p-6 rounded-lg flex flex-col gap-6">
                <Typography
                    variant="h5"
                    className="text-dark-bg">
                    Создать студента
                </Typography>
                <Grid
                    container
                    spacing={2}>
                    <Grid
                        item
                        xs={6}>
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="father">
                            Отец
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Введите имя отца"
                            id="father"
                            {...register('name')}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}>
                        <InputLabel
                            className="text-sky-500"
                            htmlFor="father">
                            Отец
                        </InputLabel>
                        <div
                            style={
                                isDragActive
                                    ? {
                                          ...dropzoneStyle,
                                          ...activeDropzoneStyle,
                                      }
                                    : dropzoneStyle
                            }
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p style={DropzoneText}>
                                Drag and drop your files here, or click to
                                select files
                            </p>
                            <ul>{fileList}</ul>
                        </div>
                        );
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained">
                    Создать
                </Button>
            </form>
        </div>
    );
}
