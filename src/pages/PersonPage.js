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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const PersonPage = () =>
{

 const {user} = useUser();
  const { uid } = useParams();
  const [error, setError] = useState('');
 const tab = "/Person";


 const [person, setPerson] = useState(null);
 const [eventAttendee, setEventAttendee] = useState(null);

 var [errorMessage, setErrorMessage] = useState('');

 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_MODE } = process.env;

 const API_URL =
     NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

const API_HEADERS =
   NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

const DEV_MODE =  process.env.REACT_APP_MODE;

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

     const getEventAttendeeDetails = async() => {
            try{

                if (eventAttendee === null)
                {
                    var url = API_URL + "/eventattendee/findbyperson?personuid=" + uid ;
                    const response = await axios.get(url,{REACT_APP_API_HEADERS});
                    setEventAttendee(response.data.EventAttendee[0]);
                    setErrorMessage('');
                 }
            }
            catch (e) {
                setErrorMessage(e.message);
            }
        };

   getPersonDetails();
   getEventAttendeeDetails();

   const checkin = async() =>
   {
       //alert("Checking in");

        try{

           if (eventAttendee != null)
           {
               var checkIn = "true";
               var url = API_URL + "/eventattendee/checkin?eventUID=" + eventAttendee.eventUid + "&personUID=" + person.uid + "&checkIn=" + checkIn ;
               //alert(url);
               const response = await axios.get(url,{REACT_APP_API_HEADERS});
               setEventAttendee(response.data.EventAttendee);
               setErrorMessage('');
            }
       }
       catch (e) {
           setErrorMessage(e.message);
       }
   }

    const checkout = async() =>
      {
            //alert("Checking out");

                  try{

                     if (eventAttendee != null)
                     {
                         var checkIn = "false";
                         var url = API_URL + "/eventattendee/checkin?eventUID=" + eventAttendee.eventUid + "&personUID=" + person.uid + "&checkIn=" + checkIn ;
                         //alert(url);
                         const response = await axios.get(url,{REACT_APP_API_HEADERS});
                         setEventAttendee(response.data.EventAttendee);
                         setErrorMessage('');
                      }
                 }
                 catch (e) {
                     setErrorMessage(e.message);
                 }
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
          <br/>Photo Permission:
          {eventAttendee.photoPermission === 'false' ? <b style={{color:"red"}}> <CloseIcon color="red" fontSize="large"/></b> :
                    <><b style={{color:"green"}}> <DoneIcon color="green" fontSize="large"/></b></> }


          <br/><h3>Contact Details</h3>
          <br/>Email: {person.contactEmail}
          <br/>Name: {person.emergencyContactName}
          <br/>Contact No: {person.emergencyContactNo}
          <br/>Relationship to {person.firstName}: {person.emergencyRelationship}

          <br/>
          <br/><b>Checked In To Camp </b>

          {eventAttendee.checkedIn === 'false' ? <b style={{color:"red"}}> <CloseIcon color="red" fontSize="large"/></b> :
          <><b style={{color:"green"}}> <DoneIcon color="green" fontSize="large"/></b></> }

          <br/>
             {DEV_MODE === 'dev' ?
             <>
             <br/>Person UID: {person.uid}
             <br/>Event UID: {eventAttendee.eventUid}
             <br/>
             </>
             :
             null}

            {eventAttendee.checkedIn === "false" ?
            <>
            <br/>
            <Button variant="contained" onClick={checkin}
                class="input-button" style={{width: 125, height: 50}}>Check In</Button>
            </>
            :
            <>
            <br/>
            <Button variant="contained" onClick={checkout}
                              class="input-button" style={{width: 125, height: 50}}>Check Out</Button>
            </>
            }

          </>
          )
          :
          <LoginPage tab={tab}/>
          }
          </>

      );
   }



export default PersonPage;