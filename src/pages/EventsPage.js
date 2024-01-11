import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LoginPage from "./LoginPage";

const EventsPage = () =>
{

    const {user} = useUser();
    const tab = "/Events";

    return (
        <>
        {user ?
        (

        <h1>Events Page</h1>

        )
        :
        <LoginPage tab={tab}/>
        }
        </>

    );
}

export default EventsPage;
