import React from 'react';
import ReactDOM from 'react-dom';
//BrowserRouter는 웹브라우저가 가지고 있는 주소 관련 정보를 props로 넘겨준다
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
