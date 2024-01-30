import * as React from "react";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";
import Box from '@mui/material/Box';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EventAttendeesResultsPage from "./EventAttendeesResultsPage";
import ImportPeople from "./ImportPeople";

import {useNavigate} from 'react-router-dom';

import TextField from '@mui/material/TextField';

const AdminPage = () =>
{

 const {user} = useUser();
 const navigate = useNavigate();
 const tab = "/Admin";

 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

 const API_URL =
         NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

 const API_HEADERS =
         NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

  const [fileName, setFileName] = React.useState(null);
  const [results,setResults] = useState('');
  const [eventAttendees,setEventAttendees] = useState('');
  const [error, setError] = useState('');
  const [eventId, setEventId] = React.useState('');

const handleMenuSelect = (menuItem) => {
    const value =  menuItem.target.value;
    setEventId(value);
};

const handleFileSelect = (fileItem) => {
  const value =  fileItem.target.value;
  setFileName(value);
  findAll();
 };

 const uploadFile = async()=> {
    try{
        setError('');
        setResults(null);

        //C:\fakepath\people_import.xlsx
        const file = "/Users/chris.welch/workspace/personal/scoutsevents/src/test/resources/people_import.xlsx";
        //alert('Uploading file: ' + file +   " Event:" + eventId);
        var url = API_URL + "/admin/person/import/people?fileName=" + file + "&eventUid=" + eventId;
        const response = await axios.get(url,{API_HEADERS});
        setEventAttendees(response.data);
    }
    catch (e) {
        setError(e.message);
    }
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

    const reports = () => {
        navigate("/Lanyards")

    };

    const lanyards = () => {
            //alert("Navigate to Lanyards");
            navigate("/Reports");
    };

    const register = () => {
                alert("Navigate to Register Participant");
    };

    return (
        <>
        {user ?
        (
        <>
        <h1>Admin Page</h1>


        <Box component="form" sx={{'& > :not(style)': {m: 2, width: '25ch'},}}
            noValidate autoComplete="off">
            <Button variant="contained" class="input-button"  style={{width:175, height:50}} onClick={reports}>Reports</Button>
            <Button variant="contained" class="input-button"  style={{width:175, height:50}} onClick={lanyards}>Print Lanyards</Button>
            <Button variant="contained" class="input-button"  style={{width:175, height:50}} onClick={register}>Register Participant</Button>

            <ImportPeople/>
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