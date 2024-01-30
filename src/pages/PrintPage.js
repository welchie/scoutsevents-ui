import React, { useRef } from 'react';
import ProgrammeOnePage from './ProgrammeOnePage';
import ProgrammeTwoPage from './ProgrammeTwoPage';
import ProgrammeAdultsPage from './ProgrammeAdultsPage';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';

import teal_banner from '../images/teal_banner.png';
import yellow_banner from '../images/yellow_banner.jpg';
import purple_banner from '../images/purple_banner.png';
import red_banner from '../images/red_banner.png';
import orange_banner from '../images/orange_banner.png';
import blue_banner from '../images/blue_banner.png';
import green_banner from '../images/green_banner.png';
import bm24logo from '../images/BM2024.png';
import scoutslogo from '../images/logo_purple.png';
import whitelogo from '../images/white.png';

import ReactToPrint, { PrintContextConsumer, useReactToPrint } from 'react-to-print';

// Using a class component, everything works without issue
export class PrintPage extends React.PureComponent {

  render() {
           const [rowsPerPage, setRowsPerPage] = ""
           const [page, setPage] = [10];
           const componentRef = null;

            const { REACT_APP_API_BASE_URL, REACT_APP_API_HEADERS, REACT_APP_API_BASE_LOCAL_URL, NODE_ENV, REACT_APP_URL , REACT_APP_MODE} = process.env;

            const API_URL =
                  NODE_ENV === 'production' ? process.env.REACT_APP_API_BASE_URL :process.env.REACT_APP_API_BASE_LOCAL_URL ;

            const QRCODE_BASE_URL = process.env.REACT_APP_API_BASE_URL;

            const DEV_MODE =  process.env.REACT_APP_MODE;

            const API_HEADERS =
                NODE_ENV === 'production' ? process.env.REACT_APP_API_HEADERS: window.API_URL ;

            var url = API_URL +  "/barcodes/qrcode/?url=" + REACT_APP_URL + "/Person/" ;

            const handleChangePage = (event, newPage) => {
                setPage(newPage);
            };

            const handleChangeRowsPerPage = (event) => {
                setRowsPerPage(+event.target.value);
                    setPage(0);
            };

    return (

      <div>
        <br/><br/>
            <table width="900">
                <tr>
                    <td style={{width:"50"}}>
                        {this.props.person.subCamp === "Adult" || this.props.person.subCamp === "Young Leaders" || this.props.person.subCamp === " " ? <img src={yellow_banner} alt="yellow_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Purple" ? <img src={purple_banner} alt="purple_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Red" ? <img src={red_banner} alt="red_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Teal" || this.props.person.subCamp === "Light Blue" ? <img src={teal_banner} alt="teal_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Green" ? <img src={green_banner} alt="green_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Orange" ? <img src={orange_banner} alt="orange_banner" width="50" height="500"/> : null}
                        {this.props.person.subCamp === "Blue" || this.props.person.subCamp === "Dark Blue"? <img src={blue_banner} alt="blue_banner" width="50" height="500"/> : null}
                    </td>
                    <td style={{width:"25"}}>
                        <h1><pre style={{padding:'0px', align:'center'}}>   {this.props.person.firstName}</pre></h1>
                        <h1><pre style={{padding:'0px', align:'center'}}>   {this.props.person.lastName}</pre></h1>
                        <h1><pre style={{padding:'0px', align:'center'}}>   {this.props.person.scoutGroup}</pre></h1>
                        <h1><pre style={{padding:'0px', align:'center'}}>   {this.props.person.subCamp}</pre></h1>
                        <img src={url+ this.props.person.uid} alt="qrcode" style={{align:'middle',padding:'100px'}} width="150" height="150"/>

                    </td>

                     <td style={{width:"50"}}>
                          {this.props.person.subCamp === "Green" || this.props.person.subCampp === "Blue" || this.props.person.subCamp === "Dark Blue" || this.props.person.subCamp === "Teal" || this.props.person.subCamp === "Light Blue" ? <ProgrammeOnePage/> : null }
                          {this.props.person.subCamp === "Purple" || this.props.person.subCamp === "Orange" || this.props.person.subCamp === "Red"? <ProgrammeTwoPage/> : null }
                          {this.props.person.subCamp === "Adult" || this.props.person.subCamp === "Young Leaders" || this.props.person.subCamp === " " ? <ProgrammeAdultsPage/> : null }
                     </td>
                </tr>
            </table>
      </div>
    );
  }
}

export default PrintPage;