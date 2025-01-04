import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { AUTH_PATH, SIGN_UP } from 'constant';

//          component: 사이더 레이아웃          //
export default function Sider() {
  const { pathname } = useLocation();

  // 로그인 및 회원가입 페이지일 때 빈 화면 반환
  const isAuthPage = pathname.startsWith(AUTH_PATH());
  const isSignUpPage = pathname.startsWith(SIGN_UP());

  if (isAuthPage || isSignUpPage) {
    return <div />; // 빈 화면
  }

  //          render: 사이더 레이아웃 렌더링          //  
  return (
    <div id='sider'>
        <div className='left-slider'></div>
        <div className='right-slider'></div>
    </div>
  );
}
