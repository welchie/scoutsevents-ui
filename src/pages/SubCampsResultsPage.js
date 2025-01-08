import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,  GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useState } from "react";
import Button from '@mui/material/Button';


 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_MODE, REACT_APP_URL } = process.env;

 const API_URL =
     NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}

 const checkin = async(eventAttendee) =>
   {

        alert("Checking in: " + eventAttendee) ;

        try{

           if (eventAttendee != null)
           {
               //alert("Checking in") ;
               var checkIn = "true";
               var url = API_URL + "/eventattendee/checkin?eventUID=" + eventAttendee.uid + "&personUID=" + eventAttendee + "&checkIn=" + checkIn ;
               //alert(url);
               const response = await axios.get(url,{REACT_APP_API_HEADERS});
               eventAttendee = response.data.EventAttendee;
               //setErrorMessage('');
            }
       }
       catch (e) {
           //setErrorMessage(e.message);
       }
   }

    const checkout = async(eventAttendee) =>
      {
            //alert("Checking out");

                  try{

                     if (eventAttendee != null)
                     {
                         var checkIn = "false";
                         var url = API_URL + "/eventattendee/checkin?eventUID=" + eventAttendee.eventUid + "&personUID=" + eventAttendee.uid + "&checkIn=" + checkIn ;
                         //alert(url);
                         const response = await axios.get(url,{REACT_APP_API_HEADERS});
                         eventAttendee = response.data.EventAttendee;
                         //setErrorMessage('');
                      }
                 }
                 catch (e) {
                    // setErrorMessage(e.message);
                 }
      }


const columns: GridColDef[] = [
  { field: 'checkedIn', headerName: 'Checked In?', width: 100, editable: false, renderCell:
            (params) => {
                return (
                    <div style={{ align: "right"}}>
                    {params.row.checkedIn === "true" ? <DoneIcon style={{ color: green[500] , padding: 20}}/> : <CloseIcon style={{ color: red[500] , padding: 20}}/> }

                    </div>
                );
            }
 },

 { field: 'url', headerName: 'QR Code', width:75, editable: false, renderCell:
 (params) => {
                 return (
                     <div>
                     <img src={API_URL + "/barcodes/qrcode/?url=" + REACT_APP_URL + params.row.url} alt="qrcode" width="60" height="60" />
                     </div>
                 );
             }
  },
  { field: 'url2', headerName: 'Details', width:100, editable: false, renderCell:
   (params) => {
                   return (
                       <div>
                       <a href={params.row.url} alt="url" width="300" height="50">{params.row.firstName} {params.row.lastName}</a>
                       </div>
                   );
               }
    },
  { field: 'lastUpdated', headerName: 'Last Updated', type: 'text', width: 150, editable: true },
  { field: 'firstName', headerName: 'First Name', type: 'text', width: 125, editable: true },
  { field: 'lastName', headerName: 'Last Name', type: 'text', width: 150, editable: true },
  { field: 'dob', headerName: 'Age', type: 'text', width: 80, editable: true },
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

const [eventAttendee, setEventAttendee] = useState(null);
 var [errorMessage, setErrorMessage] = useState('');
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