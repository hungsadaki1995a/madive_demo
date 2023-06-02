import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Login from '@/pages/login/PRO20204201P';

import App from './App';
import './stylesheets/index.css';

// const { NODE_ENV } = process.env as {
//   [key: string]: string;
// };

// msw disabled
// if (NODE_ENV === 'development') {
//   worker.start();
// }

const wrap = ReactDOM.createRoot(document.getElementById('wrap') as HTMLElement);

wrap.render(
  <React.StrictMode>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/*"
            element={<App />}
          />
        </Routes>
      </HashRouter>
    </StyledEngineProvider>
    <ToastContainer />
  </React.StrictMode>
);
