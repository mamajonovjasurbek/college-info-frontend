import {CSSProperties} from "react";

export const dropzoneStyle : CSSProperties = {
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

export const activeDropzoneStyle = {
    borderColor: '#00adb5',
};

export const DropzoneText : CSSProperties = {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
};

export const ImagePreview : CSSProperties = {
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    borderRadius: '2px',
};

export const FileName : CSSProperties = {
    display: 'flex',
    fontSize: '14px',
    marginTop: '8px',
};
