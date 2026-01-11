// Initialize error suppression FIRST - before any other imports
import { initializeEarlyErrorSuppression } from './utils/earlyErrorSuppression';
import { overrideWebchannelBlob } from './utils/webchannelBlobOverride';
import { overrideFirebaseModules } from './utils/firebaseModuleOverride';
import { initializeRootErrorSuppression } from './utils/rootErrorSuppression';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize error suppression immediately
initializeEarlyErrorSuppression();
overrideWebchannelBlob();
overrideFirebaseModules();
initializeRootErrorSuppression();

import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
