import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';
import { MainRouter } from './app/router/MainRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
);
