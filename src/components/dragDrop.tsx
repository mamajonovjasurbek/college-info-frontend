import {useDropzone} from "react-dropzone";
import {activeDropzoneStyle, dropzoneStyle, DropzoneText, FileName, ImagePreview} from "../styles/drag-and-drop.ts";
import {Dispatch, SetStateAction, useCallback} from "react";

interface  IProps {
    files : (File & {preview:string})[]
    setFiles : Dispatch<SetStateAction<(File & {preview:string})[]>>
}

export const DragDrop = ({setFiles, files} : IProps) =>{

    const onDrop = useCallback((acceptedFiles : File[]) => {
        setFiles(
            acceptedFiles.map((file : File) =>
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

    return(
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
                Drag and drop your files here, or
                click to select files
            </p>
            <ul>{fileList}</ul>
        </div>
    )

}