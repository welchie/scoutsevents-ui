import {useNavigate} from 'react-router-dom'; 
import useUser from '../hooks/useUser';
import {getAuth, signOut} from 'firebase/auth';
import Button from '@mui/material/Button';
import logo from '../images/logo_purple.png';


const HeaderPage = () => {
    const {user} = useUser();
    const navigate = useNavigate();

    const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV } = process.env;

    const API_URL =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

    const API_HEADERS =
        NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

    return (
        <nav>
            <div className="main-body">

                <table>
                    <tr>
                        <td><img src={logo} alt="Logo" width="40"/></td>
                        <td><h2 style={{ color: 'purple' }}>Pentland Scouts Events System</h2></td>
                        <td></td>
                        <td>{user ? 'Current user:' + user.email : ''}</td>
                        <td>
                        <a href="https://www.pentlandscouts.org.uk/sections/scouts_1" target="_blank" style={{ color: 'purple' }}>Web site</a></td>
                        <td><font style={{color:'red'}}>API URL: {API_URL}</font></td>
                    </tr>

                </table>
                
                 
            </div>

           <div className="nav-left">
                {

                }
           </div>
            <div className="nav-right">
                { user 
                    ? <Button variant="contained" class="input-button"  style={{width:100, height:50}} onClick={() => {
                        signOut(getAuth());
                        navigate('/login');
                    }}>Log Out</Button>
                    : <Button variant="contained" class="input-button"  style={{width:100, height:50}} onClick={(() => {
                        navigate('/login');
                    })}>Log In</Button>
                }

            </div>
        </nav>
    )
}

export default HeaderPage;