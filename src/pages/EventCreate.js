import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import axios from 'axios';
import dayjs from 'dayjs';


export default function SimplePopup() {
    const [anchor, setAnchor] = React.useState(null);

    //Event Parameters
    const [eventName,setEventName] = useState('');
    const [venue,setVenue] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [attendanceLimit,setAttendanceLimit] = useState('');
    const [emergencyContactNo,setEmergencyContactNo] = useState('');
    const [emergencyContactName,setEmergencyContactName] = useState('');
    const [error, setError] = useState('');

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

    const createEvent = async() => {
        try {
            setError('');

            //Validate data then post Event Create
            var convStartDate = dayjs(startDate).format('DD/MM/YYYY');
            var convEndDate = dayjs(endDate).format('DD/MM/YYYY');
            //alert(eventName + " " + venue + " " + emergencyContactNo + " " + emergencyContactName + " " + attendanceLimit + " " + convStartDate + " " + convEndDate);


            var url = API_URL + "/event/create";

            const payload = {
                uid: null,
                name: eventName,
                venue: venue,
                startDate: startDate,
                endDate: endDate,
                attendanceLimit: attendanceLimit,
                emergencyContactName: emergencyContactName,
                emergencyContactNo: emergencyContactNo
            };

            axios.post(url, payload).then((response) => {
                 console.log(response.status, response.data.token);
             });

            setAnchor(null);
        }
        catch (e) {
            setError(e.message);
        }
    };

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    return (


        <Box component="form"  sx={{'& > :not(style)': {m: 1, width: '25ch', height: '10ch', top: '1ch'},}}
    noValidate autoComplete="off">
        {error && <p className="error">{error}</p>}
        <TextField id="outlined-controlled" style={{width: 250}} label="Event Name" value={eventName} defaultValue={''}
    onChange={(event) => {
        setEventName(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Venue" value={venue} defaultValue={''}
    onChange={(event) => {
        setVenue(event.target.value);
    }}/>

    <br/>
    <TextField id="outlined-controlled" style={{width: 250}} label="Emergency Contact No" value={emergencyContactNo} defaultValue={''}
    onChange={(event) => {
        setEmergencyContactNo(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Emergency Contact Name" value={emergencyContactName} defaultValue={''}
    onChange={(event) => {
        setEmergencyContactName(event.target.value);
    }} />

    <br/>
    <TextField id="outlined-controlled" style={{width: 250}} label="Attendance Limit" value={attendanceLimit} defaultValue={''}
    onChange={(event) => {
        setAttendanceLimit(event.target.value);
    }} />

    <br/>
    <LocalizationProvider   dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Start Date" ampm={true} value={startDate} format="DD/MM/YYYY"
    onChange={(newValue) => setStartDate(newValue)}/>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker style={{width: 250}} label="End Date" ampm={false} value={endDate} format="DD/MM/YYYY"
    onChange={(newValue) => setEndDate(newValue)}/>
    </LocalizationProvider>

    <br/>
    <Button variant="contained" onClick={createEvent}
    class="input-button" style={{width: 100, height: 50}}>Add</Button>
    </Box>
);
}


const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const PopupBody = styled('div')(
    ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
        theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
    );

