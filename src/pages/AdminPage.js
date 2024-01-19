import * as React from "react";
import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { MuiFileInput } from 'mui-file-input'

const AdminPage = () =>
{

 const {user} = useUser();
 const tab = "/Admin";

  const [value, setValue] = React.useState(null)
  const handleChange = (newValue) => {
             setValue(newValue)
           }

 const process = async() => {
    alert('Uploading');

 }

    return (
        <>
        {user ?
        (
        <>
        <h1>Admin Page</h1>

        <h2>Import Personal Details from Excel File</h2>
        <Box component="form" sx={{'& > :not(style)': {m: 1, width: '20ch'},}}
             noValidate autoComplete="off">
             <h4>Select file</h4>
             <MuiFileInput value={value} onChange={handleChange} style={{width:300}} />
             <br/>

             <Button variant="contained" onClick={process}  class="input-button" style={{width: 100, height: 50}}>Upload</Button>

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


