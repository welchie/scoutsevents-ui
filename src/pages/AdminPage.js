import * as React from "react";
import { useState, useEffect } from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MuiFileInput } from 'mui-file-input'
import axios from 'axios';
import EventsResultsPage from "./EventsResultsPage";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';



const AdminPage = () =>
{

 const {user} = useUser();
 const tab = "/Admin";

 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

 const API_URL =
         NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

 const API_HEADERS =
         NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

  const [fileName, setFileName] = React.useState(null);
  const [results,setResults] = useState('');
  const [error, setError] = useState('');
  const [eventId, setEventId] = React.useState('');

 const handleChange = (newValue) => {
            alert(newValue);
            setFileName(newValue);
             findAll();
           }

  const handleMenuSelect = (menuItem) => {
            const value =  menuItem.target.value;
               setEventId(value);
             }
const handleFileSelect = (fileItem) => {
              const value =  fileItem.target.value;
              setFileName(value);
              findAll();
 };

 const uploadFile = async()=> {
        alert('Uploading file: ' + fileName +   " Event:" + eventId);

        //http://localhost:8080/admin/person/import/people?fileName= ****** &eventUid= ******

 };

 const findAll = async() => {
        try{
            setError('');
            setResults(null);

            var url = API_URL + "/event/all";
            const response = await axios.get(url,{API_HEADERS});
            setResults(response.data);
        }
        catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
        {user ?
        (
        <>
        <h1>Admin Page</h1>

        <h2>Import Personal Details from Excel File</h2>
        <Box component="form" sx={{'& > :not(style)': {m: 2, width: '20ch'},} }
             noValidate autoComplete="off"
             >

        <TextField id="fileName" type="file" onChange={handleFileSelect} style={{width:300}}/>
        {results ?
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"

          value={eventId}
          label="Event"
          onChange={handleMenuSelect}

         style={{width:300}}

        >
            {results.Event?.map((e, index) => {
                return (
                    <MenuItem key={e.name} value={e.uid}>
                        {e.name}
                    </MenuItem>
                );
            })}

        </Select>

        : null }

        <br/>
             <Button variant="contained" onClick={uploadFile} class="input-button" style={{width: 100, height: 50}}>Upload</Button>

        </Box>

        </>
        )
        :
        <LoginPage tab={tab}/>
        }
        </>

    );
}

export default AdminPage;


