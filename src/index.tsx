import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, StyledEngineProvider } from '@mui/material';

import App from './App';
import './stylesheets/index.css';

const wrap = ReactDOM.createRoot(document.getElementById('wrap') as HTMLElement);

wrap.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <App />
    </StyledEngineProvider>
    <ToastContainer />
  </React.StrictMode>
);
