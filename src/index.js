import React from 'react';
import ReactDOM from 'react-dom/client';

//component
import { App } from './App';

//packages
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
