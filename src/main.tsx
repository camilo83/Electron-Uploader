import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';

import { HashRouter as Router } from 'react-router-dom';
import { App } from './components/app/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
