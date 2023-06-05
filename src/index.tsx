import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, StyledEngineProvider } from '@mui/material';

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
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <App />
    </StyledEngineProvider>
    <ToastContainer />
  </React.StrictMode>
);
