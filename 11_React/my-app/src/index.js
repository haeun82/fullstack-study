import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JsxUse from './chapter3/3.4/JsxUse';
import Library from './chapter3/Library';
import Clock from './chapter4/Clock';
import PropsUse from './chapter5/5.3/PropsUse';
import Comment from './chapter5/Comment';
import CommentList from './chapter5/CommentList';
import CommentEx from './chapter5/5.6/CommentEx';
import UserInfo from './chapter5/5.6/UserInfo';
import Avatar from './chapter5/5.6/Avatar';
import NotificationList from './chapter6/NotificationList';
import Counter from './chapter7/7.2/Counter';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 4장 예제
// 1초마다 Clock 컴포넌트를 렌더링 하는 코드
// (실제 개발에서 이렇게 쓰는 경우는 없고 State를 변경해서 재렌더링 시킴)
// setInterval(() => {
//     root.render(
//         <Clock />
//     );
// }, 1000);

root.render(
    // <App />

    // 3장 예제
    // <JsxUse />
    // <Library />
    // <Clock />

    // 5장 예제
    // <PropsUse />
    // <CommentList />
    // <CommentEx 
    //     author= {{
    //         name: '하은',
    //         avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    //     }}
    //     text="안녕하세요! 하은입니다."
    //     date="2023-10-18"
    // />
    // <NotificationList />
    <Counter />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
