import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 어떤 것을 컴포넌트로 만들 것인가?
// 1. 반복적인 html이 발생할 때 
// 2. 큰 덩어리들
// 3. 여기저기 자주 출현하는 것들 (재사용을 위해 추출)
// but, 컴포넌트로 너무 잘게 쪼개는 것도 안좋음!