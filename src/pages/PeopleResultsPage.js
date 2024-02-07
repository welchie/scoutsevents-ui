import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import PersonDetailPage from './PersonDetailPage';
import axios from 'axios';

const PeopleResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  const [error,setError] = React.useState('');
  const [devMode,setDevMode] = React.useState(null);

  const [currentRow,setCurrentRow] = React.useState(null);

  const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_URL , REACT_APP_MODE} = process.env;

  const API_URL =
      NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

  const QRCODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const DEV_MODE =  process.env.REACT_APP_MODE;



  var url = API_URL +  "/barcodes/qrcode/?url=" + REACT_APP_URL + "/Person/" ;
  var personBaseUrl = REACT_APP_URL + "/Person/" ;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    return (
<Paper sx={{ width: '100%' }} style={{width:1000}}>


    {DEV_MODE === 'dev' ? <p>API_URL: {API_URL}</p>: <br/>}
    <TableContainer component={Paper} style={{width:1000}}>
    <Table size="small" tickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Sub Camp</TableCell>
            <TableCell align="left">Group</TableCell>
            <TableCell align="left">URL</TableCell>
            <TableCell align="left">QR Code</TableCell>
            {DEV_MODE === 'debug' ? <TableCell align="left">UID</TableCell> : <br/>}
        </TableRow>
      </TableHead>
      <TableBody>
      {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="left">{row.firstName}</TableCell>
            <TableCell align="left">{row.lastName}</TableCell>
            <TableCell align="left">{row.dob}</TableCell>
            <TableCell align="left" >{row.subCamp}</TableCell>
            <TableCell align="left">{row.scoutGroup}</TableCell>
            <TableCell align="left"><a href={personBaseUrl+ row.uid}>{personBaseUrl+ row.uid}</a></TableCell>
            <TableCell align="left"><img src={url+ row.uid} alt="qrcode" width="150" height="150"/></TableCell>

            {DEV_MODE === 'debug' ? <TableCell align="left">{row.uid}</TableCell> : <br/>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
   <TablePagination
   rowsPerPageOptions={[100, 150, 200]}
   component="div"
   count={rows.length}
   rowsPerPage={rowsPerPage}
   page={page}
   onPageChange={handleChangePage}
   onRowsPerPageChange={handleChangeRowsPerPage}
   style={{width:1100}}
 />

 </Paper>

    )
}

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const PopupBody = styled('div')(
    ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
        theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
    );

export default PeopleResultsPage;