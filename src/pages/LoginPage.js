import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Button from '@mui/material/Button';
import NavBar  from "./NavBar";
import navBar from "./NavBar";

const LoginPage = ({tab}) =>
{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async() => {
        try{
            await signInWithEmailAndPassword(getAuth(),email,password);
            navigate("/Events");
        }
        catch (e) {
            setError(e.message);
        }

        
    }
    return (
        <>

        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value = {email}
            onChange={e => setEmail(e.target.value)} />
        <input 
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e => setPassword(e.target.value))}/>
        <Button variant="contained" class="input-button"  style={{width:100, height:50}} onClick={logIn}>Log In</Button>
        {email === "welchie99@gmail.com" ? <><Link to="/create-account">Don't Have an account? Create one here</Link></> : null }
        </>
        
    );
}

export default LoginPage;
