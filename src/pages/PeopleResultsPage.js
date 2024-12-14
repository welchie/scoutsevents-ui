import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,  GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_MODE, REACT_APP_URL } = process.env;

 const API_URL =
     NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;


const PERSON_URL = "/Person/"

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
{ field: 'url', headerName: 'QR Code', width:100, editable: false, renderCell:
 (params) => {
                 return (
                     <div>
                     <img src={API_URL + "/barcodes/qrcode/?url=" + REACT_APP_URL + "/Person/" + params.row.uid} alt="qrcode" width="60" height="60" />
                     </div>
                 );
             }
  },
{ field: 'uid2', headerName: 'Name', width:100, editable: false, renderCell:
     (params) => {
                    var URL_API = {PERSON_URL}
                    URL_API = PERSON_URL + params.row.uid
                     return (
                         <div>
                         <a href={URL_API} alt="url" width="300" height="50">{params.row.firstName} {params.row.lastName}</a>
                         </div>
                     );
                 }
      },
  { field: 'dob', headerName: 'Age', type: 'text', width: 75, editable: true },
  { field: 'subCamp', headerName: 'Sub Camp', type: 'text', width: 110, editable: true },
  { field: 'scoutGroup', headerName: 'Group', width:120, editable: false },
  { field: 'allergies', headerName: 'Allergies', width:400, editable: false },
  { field: 'medicine', headerName: 'Medicine', width:400, editable: false },
  { field: 'dietary', headerName: 'Dietary', width:400, editable: false },
  { field: 'uid', headerName: 'UID', width:300, editable: false },

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

