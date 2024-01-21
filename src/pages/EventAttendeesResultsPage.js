import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const EventAttendeesResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

return (
        <Paper sx={{ width: '100%' }} style={{width:1000}}>
            <TableContainer component={Paper} style={{width:1000}}>
            <Table size="small" tickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell align="left">UID</TableCell>
                  <TableCell align="left">Sort Key</TableCell>
                  <TableCell align="left">eventUid</TableCell>
                  <TableCell align="left">personUid</TableCell>
                  <TableCell align="left">CheckedIn</TableCell>
                  <TableCell align="left">PhotoPermission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell align="left">{row.uid}</TableCell>
                    <TableCell align="left">{row.sortKey}</TableCell>
                    <TableCell align="left">{row.eventUid}</TableCell>
                    <TableCell align="left">{row.personUid}</TableCell>
                    <TableCell align="left">{row.checkedIn}</TableCell>
                    <TableCell align="left">{row.photoPermission}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
           <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage}
                page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} style={{width:1100}} />
         </Paper>
    )
}

export default EventAttendeesResultsPage;