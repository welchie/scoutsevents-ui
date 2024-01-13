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

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const EventsResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState({
      row1: true,
      row2: false,
      row3: false,
    });

   const { row1, row2, row3 } = state;

  var checkedRows = [];
  checkedRows[0] = "Test";
  var checkedRowsCount = 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteRows = (rows) => {
    //alert(checkedRows);
  };

//    for (let i = 0; i < rows.length; i++) {
//        if ( rows[i].)
//    text += cars[i] + "<br>";
//  }
//      for(rows)
//      console.log("Deleting checked rows");
//    }

  const checkRow = (event) => {
    checkedRowsCount++;
    checkedRows[checkedRowsCount] = "clicked row " + event.target;

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
            <FormControlLabel
                        control={
             <Checkbox  checked={row2} onChange={handleCheckedChange} name="{row.uid}" />
                        }
                        label={row.uid}
                      />

            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.venue}</TableCell>
            <TableCell align="left">{row.startDate}</TableCell>
            <TableCell align="left">{row.endDate}</TableCell>
            <TableCell align="left">{row.attendanceLimit}</TableCell>
            <TableCell align="left">{row.emergencyContactNo}</TableCell>
            <TableCell align="left">{row.emergencyContactName}</TableCell>


          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button variant="contained" onClick={deleteRows({rows})}
    class="input-button" style={{width: 100, height: 50}}>Delete</Button>

    <TableCell >Rows {checkedRows}</TableCell>
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