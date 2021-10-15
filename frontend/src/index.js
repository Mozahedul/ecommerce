import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * @version 1.0
 * @file index.js is the main file for frontend & server.js is the main file for backend
 * @see {@link https://www.facebook.com/mozahed07 Facebook}
 * @author Mozahedul Islam
 * @copyright 2021
 */

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
