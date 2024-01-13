import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';


import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";

const PersonDetailPage = ({person}) =>
{
    const {user} = useUser();
    const [error, setError] = useState('');

    //Fields
    const [uid,setUid] = useState(person.uid);
    const [firstName,setFirstName] = useState(person.firstName);
    const [lastName,setLastName] = useState(person.lastName);
    const [position,setPosition] = useState(person.position);
    const [scoutSection,setScoutSection] = useState(person.scoutSection);
    const [sectionName,setSectionName] = useState(person.sectionName);
    const [scoutGroup,setScoutGroup] = useState(person.scoutGroup);
    const [dob,setDob] = useState(person.dob);

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

    const tab = "/Person";

    const save = async() => {
    try {
        setError('');

        alert(person.uid + " " + firstName + " " + lastName + " " + dob + " " + scoutSection + " " + sectionName + " " + scoutGroup);

        var url = API_URL + "/person/update";

        const payload = {
            uid: person.uid,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            scoutSection: scoutSection,
            sectionName: sectionName,
            scoutGroup: scoutGroup,
            position: position
        };

        axios.post(url, payload).then((response) => {
            console.log(response.status, response.data.token);
        });
    }
    catch (e) {
        setError(e.message);
    }
};

    return (
        <>
        {user ? ( <> <h1>Personal Details</h1>

                <Box component="form"  sx={{'& > :not(style)': {m: 1, width: '25ch', height: '10ch', top: '1ch'},}}
    noValidate autoComplete="off" >

    {error && <p className="error">{error}</p>}

    <TextField id="outlined-controlled" style={{width: 250}} label="First Name" value={firstName} defaultValue={''}
    onChange={(event) => {
    setFirstName(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Last Name" value={lastName} defaultValue={''}
        onChange={(event) => {
        setLastName(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Date of Birth" value={dob} defaultValue={''} format={'DD/MM/YYYY'}
        onChange={(event) => {
        setDob(event.target.value);
    }}/>
    <br/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Section" value={scoutSection} defaultValue={''}
        onChange={(event) => {
        setScoutSection(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Section Name" value={sectionName} defaultValue={''}
        onChange={(event) => {
        setSectionName(event.target.value);
    }}/>

    <br/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Group" value={scoutGroup} defaultValue={''}
        onChange={(event) => {
        setScoutGroup(event.target.value);
    }}/>

    <TextField id="outlined-controlled" style={{width: 250}} label="Position" value={position} defaultValue={''}
        onChange={(event) => {
        setPosition(event.target.value)
    }}/>

    <br/>
    <Button variant="contained" onClick={save}  class="input-button" style={{width: 100, height: 50}}>Save</Button>
    </Box>
                </> ) : <LoginPage tab={tab}/> }
        </>
    );
}

export default PersonDetailPage;







