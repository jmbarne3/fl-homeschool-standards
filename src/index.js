import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { HeaderBar } from './components/header/HeaderBar';
import { Home } from './views/Home';
import { Login } from './views/auth/Login';
import { Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <Login />
  }
]);

root.render(
  <React.StrictMode>
    <BrowserRouter router={router}>
      <HeaderBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
