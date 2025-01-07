import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as React from 'react';
import SubCampsResultsPage from "./SubCampsResultsPage";
import { useState } from "react";
import axios from 'axios';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SubCampsPage = () =>
{
    const [results,setResults] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [subCamp,setSubCamp] = useState('');
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

            var url = API_URL + "/person/find?firstName=" + firstName + "&lastName=" + lastName ;
            const response = await axios.get(url,{API_HEADERS});
            setResults(response.data);
        }
        catch (e) {
            setError(e.message);
        }
    }

    const findAllBySubCamp = async() => {
        try{
            setError('');
            setResults(null);

            var url = API_URL + "/person/all/" + subCamp;
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
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSubCamp(event.target.value);
      };

    return (
        <>
        {user ?
        (

            <div id="page-body">
                <></>
                <h3>People By Sub Camp</h3>
                {error && <p className="error">{error}</p>}

                <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                     noValidate autoComplete="off">
                     <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label" style={{padding:'10px'}}>Sub Camp</InputLabel>
                       <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={subCamp}
                         label="Age"
                         onChange={handleChange}
                       >

                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Young Leader"}>Leader</MenuItem>
                        <MenuItem value={"Blue"}>Blue</MenuItem>
                        <MenuItem value={"Green"}>Green</MenuItem>
                        <MenuItem value={"Light Blue"}>Light Blue</MenuItem>
                        <MenuItem value={"Orange"}>Orange</MenuItem>
                        <MenuItem value={"Purple"}>Purple</MenuItem>
                        <MenuItem value={"Red"}>Red</MenuItem>
                        <MenuItem value={"Leader"}>Young Leader</MenuItem>
                       </Select>
                     </FormControl>

                    <br/>
                    <Button variant="contained" onClick={findAllBySubCamp}
                            class="input-button" style={{width: 100, height: 50}}>Find</Button>

                    <Button variant="contained" onClick={clear}
                            class="input-button" style={{width: 100, height: 50}}>Clear</Button>
                </Box>
                {results ? (<SubCampsResultsPage rows={results.Person}/>) : null}

            </div>
           )
           : <LoginPage tab={tab}/>
           }
           </>
    )
};

export default SubCampsPage;