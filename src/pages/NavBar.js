import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';
import CabinIcon from '@mui/icons-material/Cabin';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useUser from '../hooks/useUser';
import logo from '../images/logo_purple.png';
import {useNavigate} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';


const NavBar = ({links}) => {

        const navigate = useNavigate();
        const [value,setValue] =  React.useState(0);
        const {user} = useUser();

        const handleChange = (event, tab) => {
            setValue(tab);
        };

        return (
            <div>
                <AppBar style={{color:"purple"}} >
                    <Toolbar sx={{ bgcolor: 'white' }} >
                        <Grid container sx={{ bgcolor: 'white' }} >
                            <Grid item xs={2}>
                                <Typography>
                                    <img src={logo} alt="Logo" width="40"/>
                                </Typography>
                                <Typography>
                                         {user ? 'Current user:' + user.email : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >

                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  textColor="secondary"
                                  indicatorColor="secondary"
                                  aria-label="secondary tabs example"
                                >

                                {links.map((index) => (
                                  <Tab label={index}
                                   onClick={(() => {
                                                   navigate("/" + index);
                                                  })}/>
                                 ))}

                                </Tabs>


                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={2}>
                                <Box>
{ user
                    ? <Button variant="contained" class="input-button" style={{width:100, height:50}}  onClick={() => {
                        signOut(getAuth());
                        navigate({value});
                    }}>Log Out</Button>
                    :
                    <p></p>

                }


                                </Box>
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    export default NavBar;


