import logo from './images/logo_purple.png';
import './App.css';
import HeaderPage from './pages/HeaderPage';
import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AdminPage from './pages/AdminPage';
import CreateAccountPage from './pages/CreateAccountPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

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
             </Routes>
            </div>

            <image src={logo}/>
          </div>
          </BrowserRouter>

  );
}

export default App;
