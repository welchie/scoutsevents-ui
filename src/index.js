import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



console.log('API_BASE_URL', process.env.REACT_APP_API_BASE_URL);
console.log('API_HEADERS', process.env.REACT_APP_API_HEADERS);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7zvoOB31wExu0eaKWM95wYqqYvpc6aww",
  authDomain: "pentland-scouts-events.firebaseapp.com",
  databaseURL: "https://pentland-scouts-events-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pentland-scouts-events",
  storageBucket: "pentland-scouts-events.appspot.com",
  messagingSenderId: "664359370359",
  appId: "1:664359370359:web:0dd507accc09f7a1d15072",
  measurementId: "G-WKLTY8ZRVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
