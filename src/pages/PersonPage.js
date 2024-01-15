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


const PersonPage = () =>
{

 const {user} = useUser();
  const { uid } = useParams();
  const [error, setError] = useState('');
 const tab = "/Person";


 const [person, setPerson] = useState('');
 var [errorMessage, setErrorMessage] = useState('');

 const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

 const API_URL =
     NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

   const API_HEADERS =
       NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

 const getPersonDetails = async() => {
        try{

            var url = API_URL + "/person/find/" + uid ;
            const response = await axios.get(url,{REACT_APP_API_HEADERS});
            setPerson(response.data.Person[0]);
            setErrorMessage('');
        }
        catch (e) {
            setErrorMessage(e.message);
        }
    };

   getPersonDetails();

 return (
          <>

          {user ?
          (
          <>

          <h3>Personal Details</h3>
          <br/>First Name: {person.firstName}
          <br/>Last Name: {person.lastName}
          <br/>Date of Birth: {person.dob}
          <br/>Section: {person.scoutSection}
          <br/>Section Name: {person.sectionName}
          <br/>Scout Group: {person.scoutGroup}
          <br/>Position: {person.position}
          <br/>Medicine: {person.medicine}
          <br/>Allergies: {person.allergies}

          <br/><h3>Contact Details</h3>
          <br/>Email: {person.contactEmail}
          <br/>Name: {person.emergencyContactName}
          <br/>Contact No: {person.emergencyContactNo}
          <br/>Relationship to {person.firstName}: {person.emergencyRelationship}

          <br/>



          </>
          )
          :
          <LoginPage tab={tab}/>
          }
          </>

      );
   }


//const PersonPage = () => {
//  const { uid } = useParams();
//  const [error, setError] = useState('');
//
//  const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;
//
//    const API_URL =
//        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;
//
//      const API_HEADERS =
//          NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;
//
//
//  const getPersonDetails = async(uid) => {
//        try{
//            setError('');
//
//            var url = API_URL + "/person/find/" + uid;
//            const response = await axios.get(url,{REACT_APP_API_HEADERS});
//            //alert(response.data.Person[0].firstName);
//            return(response.data.Person[0]);
//        }
//        catch (e) {
//            setError(e.message);
//        }
//    };
//
//    const person = getPersonDetails(uid);
//    const {user} = useUser();
//     const tab = "/PersonPage";
// return (
//         <>
//         {user ?
//         (
//         <>
//         <h1>Activities Page</h1>
//         </>
//         )
//         :
//         <LoginPage tab={tab}/>
//         }
//         </>
//
//     );
//  }

export default PersonPage;