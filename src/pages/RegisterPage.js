import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import axios from 'axios';
import useUser from '../hooks/useUser';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '0px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const RegisterPage = () => {

    const {user} = useUser();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [dob,setDob] = useState('');
    const [scoutSection,setScoutSection] = useState('');
    const [sectionName,setSectionName] = useState('');
    const [scoutGroup,setScoutGroup] = useState('');
    const [position,setPosition] = useState('');
    const [medicine,setMedicine] = useState('');
    const [allergies,setAllergies] = useState('');
    const [dietary,setDietary] = useState('');
    const [contactEmail,setContactEmail] = useState('');
    const [contactPhoneNo,setContactPhoneNo] = useState('');
    const [emergencyContactName,setEmergencyContactName] = useState('');
    const [emergencyContactNo,setEmergencyContactNo] = useState('');
    const [emergencyRelationship,setEmergencyRelationship] = useState('');
    const [photoPermission,setPhotoPermission] = useState('');
    const [subCamp,setSubCamp] = useState('');

    const [error, setError] = useState('');

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_MODE } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const createPerson = async() => {
        try {
            setError('');


            var url = API_URL + "/person/create";

            const payload = {
                uid: null,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                scoutSection: scoutSection,
                sectionName : sectionName,
                scoutGroup: scoutGroup,
                position: position,
                medicine: medicine,
                allergies: allergies,
                dietary: dietary,
                contactEmail: contactEmail,
                contactPhoneNo: contactPhoneNo,
                emergencyContactName: emergencyContactName,
                emergencyContactNo: emergencyContactNo,
                emergencyRelationship: emergencyRelationship,
                photoPermission: photoPermission,
                subCamp: subCamp
            };

            alert(payload);
            axios.post(url, payload).then((response) => {
                 console.log(response.status, response.data.token);
                 alert("Person Registered: " + response.data.token);
             });

        }
        catch (e) {
            setError(e.message);
        }
    };

return (

    <>
    <h2>Register Participant</h2>
    <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off" >
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Item>
                <TextField id="outlined-controlled" style={{width: 250}} label="First Name" value={firstName} defaultValue={''}
                        onChange={(event) => {setFirstName(event.target.value);}}/>
              </Item>
            </Grid>
           <Grid xs={2}>
             <Item>
                <TextField id="outlined-controlled" style={{width: 250}} label="Last Name" value={lastName} defaultValue={''}
                        onChange={(event) => {setLastName(event.target.value);}}/>
             </Item>
           </Grid>
           <Grid xs={6}>
             <Item>
                 <TextField id="outlined-controlled" style={{width: 250}} label="Age" value={dob} defaultValue={''}
                        onChange={(event) => {setDob(event.target.value);}}/>
             </Item>
           </Grid>
           <Grid xs={2}>
             <Item>
                  <TextField id="outlined-controlled" style={{width: 250}} label="Scout Section" value={scoutSection} defaultValue={''}
                           onChange={(event) => {setScoutSection(event.target.value);}}/>
              </Item>
           </Grid>
           <Grid xs={6}>
            <Item>
                 <TextField id="outlined-controlled" style={{width: 250}} label="Scout Group" value={scoutGroup} defaultValue={''}
                                                            onChange={(event) => {setScoutGroup(event.target.value);}}/>
             </Item>
          </Grid>
          <Grid xs={2}>
               <Item>
                   <TextField id="outlined-controlled" style={{width: 250}} label="Position" value={position} defaultValue={''}
                                                              onChange={(event) => {setPosition(event.target.value);}}/>
               </Item>
          </Grid>
          <Grid xs={10}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 500}} label="Medical Details" value={medicine} defaultValue={''}
                                                                onChange={(event) => {setMedicine(event.target.value);}}/>
                 </Item>
          </Grid>
          <Grid xs={10}>
               <Item>
                   <TextField id="outlined-controlled" style={{width: 500}} label="Allergies" value={allergies} defaultValue={''}
                                                              onChange={(event) => {setAllergies(event.target.value);}}/>
               </Item>
          </Grid>
          <Grid xs={10}>
                   <Item>
                       <TextField id="outlined-controlled" style={{width: 500}} label="Dietary Requirements" value={dietary} defaultValue={''}
                                                                  onChange={(event) => {setDietary(event.target.value);}}/>
                   </Item>
            </Grid>
            <Grid xs={6}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Contact Email" value={contactEmail} defaultValue={''}
                                                                onChange={(event) => {setContactEmail(event.target.value);}}/>
                 </Item>
            </Grid>
            <Grid xs={2}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Contact No" value={contactPhoneNo} defaultValue={''}
                                                                onChange={(event) => {setContactPhoneNo(event.target.value);}}/>
                 </Item>
            </Grid>

            <Grid xs={6}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Emergency Contact Name" value={emergencyContactName} defaultValue={''}
                            onChange={(event) => {setEmergencyContactName(event.target.value);}}/>
                 </Item>
            </Grid>
            <Grid xs={2}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Emergency Contact No" value={emergencyContactNo} defaultValue={''}
                            onChange={(event) => {setEmergencyContactNo(event.target.value);}}/>
                 </Item>
            </Grid>

             <Grid xs={6}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Relationship" value={emergencyRelationship} defaultValue={''}
                            onChange={(event) => {setEmergencyRelationship(event.target.value);}}/>
                 </Item>
             </Grid>
             <Grid xs={2}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 250}} label="Photo Permission" value={photoPermission} defaultValue={''}
                            onChange={(event) => {setPhotoPermission(event.target.value);}}/>
                 </Item>
             </Grid>
            <Grid xs={10}>
                 <Item>
                     <TextField id="outlined-controlled" style={{width: 500}} label="Sub Camp" value={subCamp} defaultValue={''}
                            onChange={(event) => {setSubCamp(event.target.value);}}/>
                 </Item>
             </Grid>


          <Grid xs={3}>
               <Item>
                    <Button variant="contained" onClick={createPerson}
                              class="input-button" style={{width: 100, height: 50}}>Register</Button>
               </Item>
          </Grid>
          </Grid>

        </Box>
    </>


    );

}

export default RegisterPage;