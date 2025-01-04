import React from 'react';
import './style.css';
import backgroundImage from './assets/ju/image/오래된 종이느낌 배경.jpg';

export default function Signin() {
    return (
        <div className='SingIn'>
            <img src='backgrounImage' alt='배경' />
            <h1 className='title'>로그인</h1>
            <form className='SignIn-form'>
                <div className='input'>
                    <input type='text' placeholder='이메일 주소'>
                    <select>
                        <option>@naver.com</option>
                        <option>@google.com</option>
                        <option>@daum.com</option>
                        <option>직접 입력</option>
                    </select>
                    </input>
                </div>

                <input type='password' placeholder='비밀번호'>
                <button type="submit" className="login-button">로그인</button>
                <button type="button" className="signup-button">회원가입</button>
                <p className="forgot-password">비밀번호 잊어버렸어요</p>
                </input>
            </form>
        </div>
    )
}