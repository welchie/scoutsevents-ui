import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

const EventsResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState({
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
      6:false,
      7:false
    });

   const { row1, row2, row3 } = state;

  var checkedRows = [];
  checkedRows[0] = "Test";
  var checkedRowsCount = 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
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


        <TableCell align="left"><DeleteIcon /></TableCell>
        <TableCell align="left">Event Name</TableCell>
          <TableCell align="left">Venue</TableCell>
          <TableCell align="left">Start Date</TableCell>
          <TableCell align="left">End Date</TableCell>
          <TableCell align="left">Attendance Limit</TableCell>
          <TableCell align="left">Emergency Contact No</TableCell>
          <TableCell align="left">Emergency Contact</TableCell>
          <TableCell align="left">UID</TableCell>

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

            <TableCell align="left" >
            <FormControlLabel control={ <Checkbox   name="{1}" />}/>

            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.venue}</TableCell>
            <TableCell align="left">{row.startDate}</TableCell>
            <TableCell align="left">{row.endDate}</TableCell>
            <TableCell align="left">{row.attendanceLimit}</TableCell>
            <TableCell align="left">{row.emergencyContactNo}</TableCell>
            <TableCell align="left">{row.emergencyContactName}</TableCell>
            <TableCell align="left">{row.uid}</TableCell>


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


export default EventsResultsPage;