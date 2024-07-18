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

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Event Name', width: 200, editable: true },
  { field: 'venue', headerName: 'Venue', width: 100, editable: true },
  { field: 'startDate', headerName: 'Start Date', type: 'text', width: 110, editable: true },
  { field: 'endDate', headerName: 'End Date', type: 'text', width: 110, editable: true },
  { field: 'attendanceLimit', headerName: 'Attendance Limit', width:120, editable: false },
  { field: 'emergencyContactNo', headerName: 'Emergency Contact No.', width:170, editable: false },
  { field: 'emergencyContactName', headerName: 'Emergency Contact', width:150, editable: false },
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