import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import Startup from './components/startup';

const firebaseConfig = {
  apiKey: "AIzaSyATnLgegcgmCf2Mlm2m1Sw0Zu6O4Gpu3Jg",
  authDomain: "kauppalista-3819d.firebaseapp.com",
  projectId: "kauppalista-3819d",
  storageBucket: "kauppalista-3819d.appspot.com",
  messagingSenderId: "653393078228",
  appId: "1:653393078228:web:fcec74608fc4ed9ee3d841",
  measurementId: "G-DY7H1FD2DZ"
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthCheck fallback={<Startup />}>
        <App />
      </AuthCheck>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
