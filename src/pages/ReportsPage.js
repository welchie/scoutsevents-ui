import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import ReactToPrint, { PrintContextConsumer, useReactToPrint } from 'react-to-print';

import { useState } from "react";
import axios from 'axios';

import { PrintPage } from './PrintPage';


class Example extends React.PureComponent {


  render() {


    return (
      <div>
        <br/>

        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />

        <PrintPage ref={el => (this.componentRef = el)} />

      </div>
    );
  }
}

const ReportsPage = () => {
    const [results,setResults] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const componentRef = useRef(null);

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_URL , REACT_APP_MODE} = process.env;

    const API_URL =
          NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const QRCODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const DEV_MODE =  process.env.REACT_APP_MODE;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

    var url = API_URL +  "/barcodes/qrcode/?url=" + REACT_APP_URL + "/Person/" ;

    const search = async() => {
                try{
                    setError('');
                    setResults(null);

                    var url = API_URL + "/person/find?firstName=" + firstName + "&lastName=" + lastName ;
                    const response = await axios.get(url,{API_HEADERS});
                    setResults(response.data);
                }
                catch (e) {
                    setError(e.message);
                }
            };

            const findAll = async() => {
                try{
                    setError('');
                    setResults(null);

                    var url = API_URL + "/person/all";
                    const response = await axios.get(url,{API_HEADERS});
                    setResults(response.data);
                }
                catch (e) {
                    setError(e.message);
                }
            };

            const clear = async() => {
                 try{
                     setError('');
                     setResults(null);
                 }
                 catch (e) {
                     setError(e.message);
                 }
            };

         const handlePrint = useReactToPrint({
            content: () => componentRef.current,
          });

         const handleChangePage = (event, newPage) => {
            setPage(newPage);
         };

         const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
         };

    return (
                <div>
                <br/>
                <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}} noValidate autoComplete="off">
                    <TextField id="outlined-controlled" label="First Name" value={firstName} defaultValue={''} onChange={(event) => {setFirstName(event.target.value); }}/>

                    <TextField id="outlined-controlled" label="Last Name" value={lastName} defaultValue={''} onChange={(event) => {setLastName(event.target.value);}}/>
                    <br></br>

                    <Button variant="contained" onClick={search} class="input-button" style={{width: 100, height: 50}}>Search</Button>

                    <Button variant="contained" onClick={findAll} class="input-button" style={{width: 100, height: 50}}>Find All</Button>

                    <Button variant="contained" onClick={clear} class="input-button" style={{width: 100, height: 50}}>Clear</Button>
                </Box>
                {results ?
                    <div>

                    <Paper sx={{ width: '100%' }} style={{width:800}}>
                                            {DEV_MODE === 'dev' ? <p>API_URL: {API_URL}</p>: <br/>}
                                            <TableContainer component={Paper} style={{width:800}}>
                                                <Table size="small" tickyHeader aria-label="sticky table">
                                                  <TableBody>
                                                    {results.Person
                                                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                          .map((row) => (
                                                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0, padding:"10px" } }} >
                                                        <TableCell align="left">
                                                            <><PrintPage ref={componentRef} person={row} results={results}/></>
                                                        </TableCell>
                                                        <TableCell align="left"></TableCell>

                                                      </TableRow>
                                                         ))}
                                                     </TableBody>
                                                 </Table>
                                             </TableContainer>
                                                 <TablePagination
                                                    rowsPerPageOptions={[10, 25, 100]}
                                                    component="div"
                                                    count={results.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    style={{width:200}}
                                                  />
                                                 <Button variant="contained" onClick={handlePrint} class="input-button" style={{width: 100, height: 50}}>Print</Button>
                                             </Paper>
                    </div>
                 : null }

                </div>
    );

}

export default ReportsPage;