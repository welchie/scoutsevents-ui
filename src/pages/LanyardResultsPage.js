import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import axios from 'axios';
import bm24logo from '../images/BM2024.png';
import scoutslogo from '../images/logo_purple.png';
import LanyardFront from './LanyardFront';
import ProgrammeOnePage from './ProgrammeOnePage';
import ProgrammeTwoPage from './ProgrammeTwoPage';
import ProgrammeAdultsPage from './ProgrammeAdultsPage';
import teal_banner from '../images/teal_banner.png';
import yellow_banner from '../images/yellow_banner.png';
import purple_banner from '../images/purple_banner.png';
import red_banner from '../images/red_banner.png';
import orange_banner from '../images/orange_banner.png';
import blue_banner from '../images/blue_banner.png';
import green_banner from '../images/green_banner.png';

const LanyardResultsPage = ({rows}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  const [error,setError] = React.useState('');
  const [devMode,setDevMode] = React.useState(null);

  const [currentRow,setCurrentRow] = React.useState(null);

  const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_URL , REACT_APP_MODE} = process.env;

  const API_URL =
      NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

  const QRCODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const DEV_MODE =  process.env.REACT_APP_MODE;



  var url = API_URL +  "/barcodes/qrcode/?url=" + REACT_APP_URL + "/Person/" ;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    return (
    <Paper sx={{ width: '100%' }} style={{width:1000}}>
        {DEV_MODE === 'dev' ? <p>API_URL: {API_URL}</p>: <br/>}
        <TableContainer component={Paper} style={{width:1000}}>
        <Table size="small" tickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left">Lanyard</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0, padding:"10px" } }} >
                <TableCell align="left">
                    <>
                    <table style={{width:"300"}}>
                        <tr>
                            <td>
                                {row.subCamp === "Adult" || row.subCamp === "Young Leaders" ? <img src={yellow_banner} alt="yellow_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Purple" ? <img src={purple_banner} alt="purple_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Red" ? <img src={red_banner} alt="red_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Teal" || row.subCamp === "Light Blue" ? <img src={teal_banner} alt="teal_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Green" ? <img src={green_banner} alt="green_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Orange" ? <img src={orange_banner} alt="orange_banner" width="100" height="800"/> : null}
                                {row.subCamp === "Blue" || row.subCamp === "Dark Blue"? <img src={blue_banner} alt="blue_banner" width="100" height="800"/> : null}
                            </td>
                            <td style={{width:"50%"}}>
                                <h3><pre style={{padding:'0px', align:'left'}}>   {row.firstName}       </pre></h3>
                                <h3><pre style={{padding:'0px'}}>   {row.lastName}  </pre></h3>
                                <h3><pre style={{padding:'0px'}}>   Group: {row.scoutGroup}     </pre></h3>
                                <h3><pre style={{padding:'0px'}}>   {row.subCamp}          </pre></h3>
                                 <br/><img src={url+ row.uid} alt="qrcode" style={{align:'middle',padding:'90px'}} width="150" height="150"/>
                                 <br/><br/><br/><br/>
                                 <img src={scoutslogo} alt="Scouts Logo" width="50" height="50"/>  <img src={bm24logo} alt="BM2024" align="right" width="50" height="50"/>
                            </td>

                            <td style={{width:"40%"}}>
                                  {row.subCamp === "Green" || row.subCamp === "Blue" || row.subCamp === "Dark Blue" || row.subCamp === "Teal" || row.subCamp === "Light Blue" ? <ProgrammeOnePage/> : null }
                                  {row.subCamp === "Purple" || row.subCamp === "Orange" || row.subCamp === "Red"? <ProgrammeTwoPage/> : null }
                                  {row.subCamp === "Adult" || row.subCamp === "Young Leaders"? <ProgrammeAdultsPage/> : null }
                             </td>
                        </tr>
                    </table>
                    </>
               </TableCell>
               <TableCell align="left"></TableCell>
               {DEV_MODE === 'dev' ? <TableCell align="left">{row.uid}</TableCell> : <br/>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={rows.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
       style={{width:1100}}
     />

 </Paper>



    )
}

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};


export default LanyardResultsPage;