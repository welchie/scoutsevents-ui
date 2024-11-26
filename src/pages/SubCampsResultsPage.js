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
  { field: 'checkedIn', headerName: 'Checked In?', width: 100, editable: false, renderCell:
            (params) => {
                return (
                    <div>
                    {params.row.checkedIn === "true" ? <DoneIcon style={{ color: green[500] }}/> : <CloseIcon style={{ color: red[500] }}/> }

                    </div>
                );
            }
 },
 { field: 'url', headerName: 'QR Code', width:100, editable: false, renderCell:
 (params) => {
                 return (
                     <div>
                     <img src={"http://localhost:8080/barcodes/qrcode/?url=" + params.row.url} alt="qrcode" width="50" height="50"/>
                     </div>
                 );
             }
  },
  { field: 'firstName', headerName: 'First name', width: 100, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 100, editable: true },
  { field: 'dob', headerName: 'Age', type: 'text', width: 110, editable: true },
  { field: 'subCamp', headerName: 'Sub Camp', width:120, editable: false },
  { field: 'scoutGroup', headerName: 'Group', width:150, editable: false },
  { field: 'allergies', headerName: 'Allergies', width:200, editable: false },
  { field: 'dietary', headerName: 'Dietary', width:200, editable: false },
  { field: 'medicine', headerName: 'Medicine', width:300, editable: false },
  { field: 'contactEmail', headerName: 'Contact Email', width:300, editable: false },
  { field: 'contactPhoneNo', headerName: 'Contact Phone No', width:300, editable: false },
  { field: 'emergencyContactName', headerName: 'Emergency Contact Name', width:300, editable: false },
  { field: 'emergencyContactNo', headerName: 'Emergency Contact No.', width:300, editable: false },
  { field: 'emergencyRelationship', headerName: 'Relationship', width:300, editable: false },
  { field: 'photoPermission', headerName: 'Photo Permission', width:300, editable: false, renderCell:
        (params) => {
            return (
                <div>
                {params.row.photoPermission === "true" ? <DoneIcon style={{ color: green[500] }}/> : <CloseIcon style={{ color: red[500] }}/> }
                </div>
            );
        }

   },

];

function getRowId(row) {
  return row.uid;
};

export default function SubCampDataGrid({rows}) {
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