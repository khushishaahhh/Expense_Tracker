import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <title>Expense Tracker</title>
    <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

