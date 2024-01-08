import logo from './images/logo_purple.png';
import './App.css';
import HeaderPage from './pages/HeaderPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
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
             <Route path="/main" element = {<MainPage />} />
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
