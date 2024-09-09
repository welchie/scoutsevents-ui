import logo from './images/logo_purple.png';
import './App.css';
import HeaderPage from './pages/HeaderPage';
import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AdminPage from './pages/AdminPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PersonPage from './pages/PersonPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LanyardsPage from './pages/LanyardsPage';
import ReportsPage from './pages/ReportsPage';
import SubCampsPage from './pages/SubCampsPage';
import RegisterPage from './pages/RegisterPage';
import Barrwood24Page from './pages/Barrwood24Page';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <HeaderPage/>
      <div id="page-body">

            <Routes>
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/Events" element={<EventsPage/>} />
             <Route path="/Activities" element={<ActivitiesPage/>} />
             <Route path="/Admin" element={<AdminPage/>} />
             <Route path="/People" element = {<PeoplePage />} />
             <Route path="/create-account" element= {<CreateAccountPage/>}/>
             <Route path="*" element={<LoginPage/>}/>
             <Route path="/Person/:uid" element={<PersonPage />}/>
             <Route path="/Lanyards" element = {<LanyardsPage />} />
             <Route path="/Barrwood24" element = {<Barrwood24Page />} />
             <Route path="/Reports" element = {<ReportsPage />} />
              <Route path="/SubCamps" element = {<SubCampsPage />} />
               <Route path="/Register" element = {<RegisterPage />} />
             </Routes>
            </div>

            <image src={logo}/>
          </div>
          </BrowserRouter>

  );
}

export default App;
