import {useNavigate} from 'react-router-dom'; 
import useUser from '../hooks/useUser';
import {getAuth, signOut} from 'firebase/auth';
import Button from '@mui/material/Button';
import logo from '../images/logo_purple.png';


const HeaderPage = () => {
    const {user} = useUser();
    const navigate = useNavigate();
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