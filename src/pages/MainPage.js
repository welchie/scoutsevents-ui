import { useState } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import dayjs from 'dayjs';
import ResultsPage from "./ResultsPage";
import qrcode from "./qrcode";


const MainPage = () =>
{
    const [error, setError] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [dob,setDob] = useState('');
    const [results,setResults] = useState('');

    const search = async() => {
        try{

            setError('');
            setResults(null);
  
            const headers = "Authorization: Basic dXNlcjpwYXNzd29yZA==";
    
            var convertDob = dayjs(dob).format('DD/MM/YYYY');
            //var convertEndDate = dayjs(endDate).format('YYYY-MM-DD HH:mm:ss');
            //var baseUrl = "http://ec2-18-201-141-234.eu-west-1.compute.amazonaws.com";
            var baseUrl = "http://localhost:8080";

            http://ec2-18-201-141-234.eu-west-1.compute.amazonaws.com/person/find?firstName=Chris&lastName=Welch&dob=30%2F03%2F1973
            var url = baseUrl + "/person/find?firstName=" + firstName + "&lastName=" + lastName + "&dob=" + convertDob;
            //alert(url);
            const response = await axios.get(url,{headers});
            setResults(response.data);
            //alert(results.Person[0].firstName);
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

     const findAll = async() => {
            try{

                setError('');
                setResults(null);

                const headers = "Authorization: Basic dXNlcjpwYXNzd29yZA==";

                //var baseUrl = "http://ec2-18-201-141-234.eu-west-1.compute.amazonaws.com";
                var baseUrl = "http://localhost:8080";

                var url = baseUrl + "/person/all";
                const response = await axios.get(url,{headers});
                setResults(response.data);

           }
            catch (e) {
                setError(e.message);
            }
        }
    return (
        <div id="page-body" >
            <>
            <qrcode/>
            <h3>Search</h3>
            {error && <p className="error">{error}</p>}

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"

    >


        <TextField
        id="outlined-controlled"
        label="First Name"
        value={firstName}
        defaultValue={''}
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
           <TextField
              id="outlined-controlled"
              label="Last Name"
              value={lastName}
              defaultValue={''}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
               <br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs} >


                <DateTimePicker
                  label="Date of Birth"
                  ampm={false}
                  value={dob}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => setDob(newValue)}
            
                  />
                  

    
            </LocalizationProvider>
           
            <br></br>
            <Button variant="contained" onClick={search}
            class="input-button" style={{width:100,height:50}}>Search</Button>


            <Button variant="contained" onClick={findAll}
                class="input-button" style={{width:100,height:50}}>Find All</Button>

            <Button variant="contained" onClick={clear}
                           class="input-button" style={{width:100,height:50}}>Clear</Button>
            
           </Box>

           {results ? (
                                <ResultsPage rows={results.Person}/>  )
                                : null}

           </>


        </div>   
    )
};

export default MainPage;