import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";

const ActivitiesPage = () =>
{

 const {user} = useUser();
 const tab = "/Activities";

    return (
        <>
        {user ?
        (
        <>
        <h1>Activities Page</h1>
        </>
        )
        :
        <LoginPage tab={tab}/>
        }
        </>

    );
}

export default ActivitiesPage;


