import logo from './images/logo_purple.png';
import './App.css';
import HeaderPage from './pages/HeaderPage';
import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AdminPage from './pages/AdminPage';
import PersonPage from './pages/PersonPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LanyardsPage from './pages/LanyardsPage';
import ReportsPage from './pages/ReportsPage';
import SubCampsPage from './pages/SubCampsPage';
import RegisterPage from './pages/RegisterPage';
import Barrwood24Page from './pages/Barrwood24Page';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <HeaderPage/>
      <div id="page-body">

            <Routes>
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/Events" element={<ProtectedRoute><EventsPage/></ProtectedRoute>} />
             <Route path="/Activities" element={<ProtectedRoute><ActivitiesPage/></ProtectedRoute>} />
             <Route path="/Admin" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
             <Route path="/People" element = {<ProtectedRoute><PeoplePage /></ProtectedRoute>} />
             <Route path="/Person/:uid" element={<ProtectedRoute><PersonPage /></ProtectedRoute>}/>
             <Route path="/Lanyards" element = {<ProtectedRoute><LanyardsPage /></ProtectedRoute>} />
             <Route path="/Barrwood24" element = {<ProtectedRoute><Barrwood24Page /></ProtectedRoute>} />
             <Route path="/Reports" element = {<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
             <Route path="/SubCamps" element = {<ProtectedRoute><SubCampsPage /></ProtectedRoute>} />
             <Route path="/Register" element = {<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
             <Route path="*" element={<LoginPage/>}/>
             </Routes>
            </div>

            <image src={logo}/>
          </div>
          </BrowserRouter>

  );
}

export default App;
