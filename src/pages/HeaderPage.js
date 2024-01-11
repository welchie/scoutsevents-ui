import {useNavigate} from 'react-router-dom'; 
import useUser from '../hooks/useUser';
import {getAuth, signOut} from 'firebase/auth';
import Button from '@mui/material/Button';
import logo from '../images/logo_purple.png';
import MenuPage from "./MenuPage";
import NavBar from "./NavBar";
import * as React from "react";


const HeaderPage = () => {
    const {user} = useUser();
    const navigate = useNavigate();

    const linksArray = ["Events","People","Activities", "Admin"];
    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

    return (
        <>
                                <NavBar links={linksArray}/>
       </>
    )
}

export default HeaderPage;