import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from 'layouts/Header';
import Sider from 'layouts/Sider';
import { AUTH_PATH } from 'constant';

//          component: 레이아웃          //
export default function Container() {

  //          state: 현재 페이지 path name 상태          //
  const { pathname } = useLocation();

  //          render: 레이아웃 렌더링          //
  return (
    <div className="container">
      <Header />
      <Sider />
      <Outlet />

      {/* Sider가 중복되지 않도록 제거 */}
    </div>
  );
}
