import React, { ChangeEvent, useEffect } from 'react';
import './style.css';
import {useState, useRef, KeyboardEvent} from 'react';
import InputBox from 'components/InputBox';
import { SignInRequestDto, SignUpRequestDto } from 'apis/ju/auth';
import { signInRequest, signUpRequest} from 'apis';
import SignInResponseDto from 'apis/ju/auth/sign-in.response.dto';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { SignUpResponseDto } from 'apis/response/auth';

//          component: 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

  const onClickChangeMainpathHandler = () => {
    navigator(MAIN_PATH());
};

  //          state:쿠키 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          component: sign in card 컴포넌트           //
  const SignInCard = () => {

    //          state: 이메일 요소 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: 패스워드 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //         state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    //         state: 패스워드 상태         //
    const [password, setPassword] = useState<string>('');
    //         state: 패스워드 타입 상태         //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    //         state: 패스워드 버튼 아이콘 상태         //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    //         state: 에러 상태         //
    const [error, setError] = useState<boolean>(false);

    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if(!responseBody) {
        alert('네트워크 이상입니다.')
        return;
      }
      const {code} = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code === 'SF' || code ==='VF') setError(true);
      if (code !== 'SU') return;

      const {token,expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000)

      setCookie('accessToken', token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());
    }

    //          event hadler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    }
    //          event hadler: 비밀번호 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    }

      

    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = {email, password};
      signInRequest(requestBody).then(signInResponse);
    }
    
    //          event handler: 회원가입 버튼 클릭 이벤트 처리 함수         //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
    }

    //          event handler: 패스워드 버튼 클릭 이벤트 처리 함수         //
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text'){
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      }
      else {
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    }

    //          event handler: 이메일 인풋 키 다운 이벤트 처리 함수         //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //          event handler: 패스워드 인풋 키 다운 이벤트 처리 함수         //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }



    //          render: sign in card 컴포넌트 렌더링          //
    return (
      <div className='auth-card'>
        <div className='auth-card-top'>
          <div className='auth-card-title-box'>
            
              <div className='auth-card-title'>{'로그인'}</div>
            
          </div>
          <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일을 입력해주세요' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
          <InputBox ref={passwordRef} label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/> 
          <div className='auth-card-bottom'>
            {error && 
              <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.'}
              </div>
            </div>
            }
            <div className='large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규사용자이신가요?'}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };


      //          component: sign up card 컴포넌트           //
  const SignUpCard = () => {

    //          state: 닉네임 요소 참조 상태          //
    const nicknameRef = useRef<HTMLInputElement | null >(null);
    //          state: 이메일 요소 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null >(null);
    //          state: 비밀번호 요소 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null >(null);

    
    //          state: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');

    //          state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');

    //          state: 패스워드 상태          //
    const [password, setPassword] = useState<string>('');

    //          state: 패스워드 타입상태          //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password')

    //          state: 닉네임 에러 상태          //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    //          state: 이메일 에러 상태          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: 패스워드 에러 상태          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);

    //          state: 닉네임 에러 메세지 상태          //
    const[nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    //          state: 이메일 에러 메세지 상태          //
    const[emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    //          state: 패스워드 에러 메세지 상태          //
    const[passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

    //         state: 패스워드 버튼 아이콘 상태         //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

    //         function: sign up response 처리 함수         //
    const signUpResponse = (resposeBody: SignUpResponseDto | ResponseDto | null) => {
      if (!resposeBody) {
        alert ('네트워크 이상입니다.');
        return;
      }
      const { code } = resposeBody;
      if (code === "DE") {
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다.');
      }
      if (code === "DN") {
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다.');
      }
      if (code === "VF") alert('모든 값을 입력하세요.');
      if (code === "DBE") alert('데이터 베이스 오류입니다.');

      if (code !== "SU") {
        alert (code); //for test
        return; }

      alert ('회원가입에 성공했습니다. 로그인해주세요');
      setView('sign-in');
      return;
    } 
    
    //          event hadler: 닉네임 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const{value} = event.target;
      setNickname(value);
    }

    //          event hadler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const{value} = event.target;
      setEmail(value);
    }

    //          event hadler: 패스워드 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const{value} = event.target;
      setPassword(value);
    }

    //          event handler:패스워드 버튼 클릭 이벤트 처리          //
    const onPasswordButtonClickHandler =() => {
      if(passwordButtonIcon === 'eye-light-off-icon') {
        setPasswordButtonIcon('eye-light-on-icon');
        setPasswordType('text');
      }
      else {
        setPasswordButtonIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }

    //          event handler: 다음 단계 버튼 클릭 이벤트 처리          //
    const onNextButtonClickHandler = () => {
      const nicknamePattern = /^[가-힣]+$/;
      const isNicknamePattern = nicknamePattern.test(nickname);
      if (!isNicknamePattern) {
        setNicknameError(true);
        setNicknameErrorMessage('한글만 입력가능합니다.')
      }
      
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.')
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.')
      }
      if (!isNicknamePattern || !isEmailPattern || !isCheckedPassword) return;
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리          //
    const onSignUpButtonClickHandler = () => {
      const nicknamePattern = /^[가-힣]+$/;
      const isNicknamePattern = nicknamePattern.test(nickname);
      if (!isNicknamePattern) {
        setNicknameError(true);
        setNicknameErrorMessage('한글만 입력가능합니다.')
      }
      
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.')
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.')
      }

      const hasNickname = nickname.trim().length !== 0;
      if (!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요.')
      }
      const requestBody: SignUpRequestDto = {
        nickname, email, password
      };
      signUpRequest(requestBody).then(signUpResponse);


    }

    //          evnet handelr: 로그인 링크 클릭 이벤트 처리          //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    }
  

    //          event handler: 닉네임 키 다운 이벤트 처리          //
    const onNicknameKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if (!emailRef.current) return; 
      emailRef.current.focus(); 
    }
    //          event handler: 이메일 키 다운 이벤트 처리          //
    const onEmailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if (!passwordRef.current) return; 
      passwordRef.current.focus(); 
    }
    //          event handler: 패스워드 키 다운 이벤트 처리          //
    const onPasswordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignUpButtonClickHandler(); 
    }

    //          render: sign up card 컴포넌트 렌더링         //
    return (
      <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'회원가입'}</div>
              </div>
              <InputBox ref={nicknameRef} label='닉네임'type='text' placeholder='닉네임을 입력해주세요' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler} />
              <InputBox ref={emailRef} label='이메일'type='text' placeholder='이메일을 입력해주세요' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label='비밀번호'type={passwordType} placeholder='비밀번호를 입력해주세요' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} onKeyDown={onPasswordKeyDownHandler}/>
            </div>
            <div className='auth-card-bottom' >
              <div className='large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
              <div className='auth-description-box'>
                <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
              </div>
            </div>
          </div>
      </div>
    );
  };

  //          render: 인증 화면 컴포넌트 렌더링          //
  return (
    <div id='auth-wrapper'>
      <div className='left'>
        <p className='titles' onClick={onClickChangeMainpathHandler}>흙수저 레시피</p>
        <p className='description'>우리가 가장 중요하게 생각하는 점은 레시피에 대한 이해도입니다 그런 면에서 이 흙수저 레시피는 독자들이 이해하기 쉽게 쓰여진 아주 훌륭한 레시피입니다 </p>
      </div>
      <div className='right'>

      </div>
      {view === 'sign-in' && <SignInCard />}
      {view === 'sign-up' && <SignUpCard />}
    </div>
  )
}