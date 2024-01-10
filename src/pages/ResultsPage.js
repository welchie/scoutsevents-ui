import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const ResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const baseUrl = "http://ec2-18-201-141-234.eu-west-1.compute.amazonaws.com:8000";
  const url = baseUrl + "/barcodes/qrcode/?url=" + baseUrl + "/person/personaldetails/";
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeRow = (uid) => {
      url = url + uid;
      alert(url);
    };

    return (  
      

<Paper sx={{ width: '100%' }} style={{width:1000}}>
    <TableContainer component={Paper} style={{width:1000}}>
    <Table size="small" tickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>

          <TableCell align="left">First Name</TableCell>
          <TableCell align="left">Last Name</TableCell>
          <TableCell align="left">Date of Birth</TableCell>
          <TableCell align="left">Scout Section</TableCell>
          <TableCell align="left">Section Name</TableCell>
          <TableCell align="left">Scout Group</TableCell>
          <TableCell align="left">Position</TableCell>
          <TableCell style={{width:200}}>ID</TableCell>
           <TableCell align="left">QR Code</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

          >

            <TableCell align="left">{row.firstName}</TableCell>
            <TableCell align="left">{row.lastName}</TableCell>
            <TableCell align="left">{row.dob}</TableCell>
            <TableCell align="left">{row.scoutSection}</TableCell>
            <TableCell align="left">{row.sectionName}</TableCell>
            <TableCell align="left">{row.scoutGroup}</TableCell>
            <TableCell align="left">{row.position}</TableCell>
            <TableCell align="left">{row.uid}</TableCell>
            <TableCell align="left"><img src={url+ row.uid} alt="qrcode"/></TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
   <TablePagination
   rowsPerPageOptions={[10, 25, 100]}
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


export default ResultsPage;