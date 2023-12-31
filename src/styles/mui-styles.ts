import styled from '@emotion/styled';
import { TableRow } from '@mui/material';

export const bgColor = "#505269"
export const btnColor = "#01987A"
export const lightBg = "#37384A"
export const darkBg = "#01987A"


export const tableHeaderStyle = {
    border : "none",
    padding : 2,
    backgroundColor : darkBg,
    color : "#fff",
    // minWidth : 200
}

export const tableCellStyle = {
    border : "none",
    padding : 2,
    backgroundColor : "rgb(157, 178, 191)",
    color : "rgb(39, 55, 77)",
    fontSize : '16px',
    fontWeight : "500"
}


export const modalStyle = {
    backgroundColor : "#fff",
    position: 'absolute',
    color : "#fff",
    top: '50%',
    left: '50%',
    maxHeight: "calc(100vh - 210px)",
    overflowY: "auto",
    transform: 'translate(-50%, -50%)',
    overflow : "scroll"
}

export const muiBtn = {
    backgroundColor : btnColor,
    // width : "fit-content",
    color : "#fff"
}


export const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #fff;
    border-radius : 15px;
    td {
    color : #333;
      font-weight : 600;
    }
  }
  &:nth-of-type(even) {
    background-color: #F3F3F3;
    border-radius : 15px;
    color : #01987A;
    td {
    font-weight : 600;
      color : #01987A;
    }
  }
  & > td {
    color: white;
  }
`;

export const modalInputLabel = {
    color : "#ffff",
    fontSize : "16px"
}

export const inputStyle  = "p-2 rounded placeholder-slate-400 text-dark-bg"

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };