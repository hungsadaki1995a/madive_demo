import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import Login from '@/pages/login';
import App from './App';
import { worker } from '@/mocks/browsers';
import './stylesheets/index.css';

const { NODE_ENV } = process.env as {
  [key: string]: string;
};

// msw disabled
// if (NODE_ENV === 'development') {
//   worker.start();
// }

const wrap = ReactDOM.createRoot(document.getElementById('wrap') as HTMLElement);

wrap.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
