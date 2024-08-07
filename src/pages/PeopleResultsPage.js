import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,  GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}


/**
         <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Sub Camp</TableCell>
            <TableCell align="left">Group</TableCell>
            <TableCell align="left">URL</TableCell>
            <TableCell align="left">QR Code</TableCell>
            {DEV_MODE === 'debug' ? <TableCell align="left">UID</TableCell> : <br/>}

            **/

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 100, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 100, editable: true },
  { field: 'dob', headerName: 'Age', type: 'text', width: 75, editable: true },
  { field: 'subCamp', headerName: 'Sub Camp', type: 'text', width: 110, editable: true },
  { field: 'scoutGroup', headerName: 'Group', width:120, editable: false },
  { field: 'url', headerName: 'URL', width:170, editable: false },
  { field: 'qrcode', headerName: 'QR Code', width:150, editable: false },
  { field: 'uid', headerName: 'UID', width:300, editable: false }
];
function getRowId(row) {
  return row.uid;
};

export default function EventsDataGrid({rows}) {

  return (
  <>
    <Box sx={{ height: 400, width: '150%' }}>
      <DataGrid
        getRowId={getRowId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
                  toolbar: CustomToolbar,
                }}
      />
    </Box>
    </>
  );
  }

