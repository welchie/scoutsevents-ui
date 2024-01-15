import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";
import EventsResultsPage from "./EventsResultsPage";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';

import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

import EventCreate from './EventCreate';

const EventsPage = () =>
{


    const [results,setResults] = useState('');
    const [eventName,setEventName] = useState('');
    const [venue,setVenue] = useState('');
    const [error, setError] = useState('');


    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;



    const {user} = useUser();
    const tab = "/Events";

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

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

    const search = async() => {
        try{
            setError('');
            setResults(null);

            var url = API_URL + "/event/find?name=" + eventName + "&venue=" + venue;
            const response = await axios.get(url,{API_HEADERS});
            setResults(response.data);
        }
        catch (e) {
            setError(e.message);
        }
    };

    const clear = async() => {
    try{
        setError('');
        setResults(null);
    }
    catch (e) {
        setError(e.message);
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

}

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

    return (
        <>
        {user ?
        (
            <div id="page-body">
                <></>
                <h3>Search</h3>
                {error && <p className="error">{error}</p>}

                <Box component="form" sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                    noValidate autoComplete="off">
                    <TextField id="outlined-controlled" label="Event Name" value={eventName} defaultValue={''}
                        onChange={(event) => {
                            setEventName(event.target.value);
                    }}/>

                    <TextField id="outlined-controlled" label="Venue" value={venue} defaultValue={''}
                        onChange={(event) => {
                        setVenue(event.target.value);
                    }}/>
                    <br></br>
                    <Button variant="cont<ained" onClick={search} class="input-button"
                        style={{width: 100, height: 50}}>Search </Button>

                    <Button variant="contained" onClick={findAll}
                        class="input-button" style={{width: 100, height: 50}}>Find All</Button>

<Button variant="contained" aria-describedby={id} onClick={handleClick} type="button" class="input-button"
    style={{width: 100, height: 50}}>Create </Button>
<BasePopup id={id} open={open} anchor={anchor}>
    <PopupBody><EventCreate/></PopupBody>
</BasePopup>


                    <Button variant="contained" onClick={clear}
                        class="input-button" style={{width: 100, height: 50}}>Clear</Button>



                </Box>
                {results ? (<EventsResultsPage rows={results.Event}/>) : null}

            </div>

        )
        :
        <LoginPage tab={tab}/>
        }
        </>

    );


}

export default EventsPage;
