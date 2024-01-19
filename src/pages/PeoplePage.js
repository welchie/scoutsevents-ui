import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import PeopleResultsPage from "./PeopleResultsPage";
import { useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPage from "./MenuPage";
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";

const PeoplePage = () =>
{
    const [results,setResults] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [dob,setDob] = useState('');
    const [error, setError] = useState('');

    const {user} = useUser();
    const tab = "/People"

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
      NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;


    const search = async() => {
        try{
            setError('');
            setResults(null);

            var convertDob = dayjs(dob).format('DD/MM/YYYY');
            var url = API_URL + "/person/find?firstName=" + firstName + "&lastName=" + lastName + "&dob=" + convertDob;
            const response = await axios.get(url,{API_HEADERS});
            setResults(response.data);
        }
        catch (e) {
            setError(e.message);
        }
    }

    const findAll = async() => {
        try{
            setError('');
            setResults(null);

            var url = API_URL + "/person/all";
            const response = await axios.get(url,{API_HEADERS});
            setResults(response.data);
        }
        catch (e) {
            setError(e.message);
        }
    }
    const clear = async() => {
        try{
            setError('');
            setResults(null);
       }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        {user ?
        (

            <div id="page-body">
                <></>
                <h3>People</h3>
                {error && <p className="error">{error}</p>}

                <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                     noValidate autoComplete="off">
                    <TextField id="outlined-controlled" label="First Name" value={firstName} defaultValue={''}
                               onChange={(event) => {
                                   setFirstName(event.target.value);
                               }}/>

                    <TextField id="outlined-controlled" label="Last Name" value={lastName} defaultValue={''}
                               onChange={(event) => {
                                   setLastName(event.target.value);
                               }}/>
                    <br></br>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Date of Birth" ampm={false} value={dob} format="DD/MM/YYYY"
                                        onChange={(newValue) => setDob(newValue)}/>
                    </LocalizationProvider>

                    <br></br>
                    <Button variant="contained" onClick={search} class="input-button"
                            style={{width: 100, height: 50}}>Search
                    </Button>

                    <Button variant="contained" onClick={findAll}
                            class="input-button" style={{width: 100, height: 50}}>Find All</Button>

                    <Button variant="contained" onClick={clear}
                            class="input-button" style={{width: 100, height: 50}}>Clear</Button>
                </Box>
                {results ? (<PeopleResultsPage rows={results.Person}/>) : null}

            </div>
           )
           : <LoginPage tab={tab}/>
           }
           </>
    )
};

export default PeoplePage;