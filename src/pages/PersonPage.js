import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";
import Button from '@mui/material/Button';


const PersonPage = () =>
{

 const {user} = useUser();
  const { uid } = useParams();
  const [error, setError] = useState('');
 const tab = "/Person";


 const [person, setPerson] = useState(null);
 var [errorMessage, setErrorMessage] = useState('');

 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

 const API_URL =
     NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

   const API_HEADERS =
       NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

 const getPersonDetails = async() => {
        try{
            if (person === null)
            {
                var url = API_URL + "/person/find/" + uid ;
                const response = await axios.get(url,{REACT_APP_API_HEADERS});
                setPerson(response.data.Person[0]);
                setErrorMessage('');
             }
        }
        catch (e) {
            setErrorMessage(e.message);
        }
    };

   getPersonDetails();

   const checkin = () =>
   {
       alert("Checking in");
   }

 return (
          <>

          {user ?
          (
          <>

          <h3>Personal Details</h3>
          <br/>First Name: {person.firstName}
          <br/>Last Name: {person.lastName}
          <br/>Age: {person.dob}
          <br/>Sub Camp: {person.subCamp}
          <br/>Section: {person.scoutSection}
          <br/>Group: {person.scoutGroup}
          <br/>Position: {person.position}
          <br/>Medicine: {person.medicine}
          <br/>Allergies: {person.allergies}
          <br/>Photo Permission: {person.photoPermission}

          <br/><h3>Contact Details</h3>
          <br/>Email: {person.contactEmail}
          <br/>Name: {person.emergencyContactName}
          <br/>Contact No: {person.emergencyContactNo}
          <br/>Relationship to {person.firstName}: {person.emergencyRelationship}

          <br/>

            <Button variant="contained" onClick={checkin}
                class="input-button" style={{width: 100, height: 50}}>Check In</Button>


          </>
          )
          :
          <LoginPage tab={tab}/>
          }
          </>

      );
   }



export default PersonPage;