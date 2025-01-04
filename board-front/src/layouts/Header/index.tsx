import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, RECIPE_DETAIL_PATH, RECIPE_PATH, RECIPE_UPDATE_PATH, RECIPE_WRITE_PATH, SIGN_UP, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useBoardStore } from 'stores';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { postBoardRequest } from 'apis';
import { PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { PostBoardRequestDto } from 'apis/request/board';
import useLoginUserStore from 'stores/login-user.store';


//          component: 헤더 레이아웃          //
export default function Header() {

  //          state: 로그인 유저 상태           //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

  //          state: path 상태          //
  const { pathname } = useLocation();

  //          state: cookie 상태           //
  const [cookies, setCookie] = useCookies();
  //          state: 로그인 상태          //
  const [isLogin, setLogin] = useState<boolean>(false);

  //          state: 인증 페이지 상태          //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //          state: 메인 페이지 상태          //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //          state: 회원가입 페이지 상태          //
  const [isSignUpPage, setSignUpPage] = useState<boolean>(false);
  //          state: 레시피 게시판 이지 상태          //
  const [isRecipeBoardPage, setRecipeBoardPage] = useState<boolean>(false);
  //          state: 레시피 게시판 게시물 상세 페이지 상태          //
  const [isRecipeBoardDetailPage, setRecipeBoardDetailPage] = useState<boolean>(false);
  //          state: 레시피 게시판 게시물 작성 페이지 상태          //
  const [isRecipeBoardWritePage, setRecipeBoardWritePage] = useState<boolean>(false); 
  //          state: 레시피 게시판 게시물 수정 페이지 상태          //
  const [isRecipeBoardUpdatePage, setRecipeBoardUpdatePage] = useState<boolean>(false);
  //          state: 자유 게시판 페이지 상태          //
  const [isBoardPage, setBoardPage] = useState<boolean>(false);
  //          state: 자유 게시판 게시물 상세 페이지 상태          //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //          state: 자유 게시판 게시물 작성 페이지 상태          //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //          state: 자유 게시판 게시물 수정 페이지 상태          //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();  

  //          event handler: 로고 클릭 이벤트 처리 함수          //
  const onLogClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //          event handler: 레시피 게시판 버튼 클릭 이벤트 처리 함수          //
  const onRecipeBoardButtonClickHandler = () => {
    navigate(RECIPE_PATH());
  }
  
  //          event handler: 자유 게시판 버튼 클릭 이벤트 처리 함수          //
  const onBoardButtonClickHandler = () => {
    navigate(BOARD_PATH());
  }

  //          component: 로그인, 회원가입 버튼 컴포넌트          //
  const AuthButton = () => {

    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수          //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리 함수          //
    const onSignUpButtonClickHandler = () => {
      navigate(SIGN_UP());
    }

    if (isLogin) {
      return (
        <div className='header-top-box'>
          <div className='welcome'>
            <div className='icon-box'>
              <div className='logo-person-icon'></div>
            </div>
            <div className='trans-content'>{'환영합니다.'}</div>
          </div>
        </div>
      );
    }
    return (
      <div className='header-top-box'>
        <div className='sign-in'>
          <div className='icon-box'>
            <div className='logo-sign-in-icon'></div>
          </div>
          <div className='contents' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
        </div>
        <div className='sign-up'>
          <div className='icon-box'>
            <div className='logo-sign-up-icon'></div>  
          </div>
          <div className='contents' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
        </div>
      </div>
    );
  }







  //          component: 업로드 버튼 컴포넌트          //
  const RecipeUploadButton = () => {

    //          state: 게시물 상태          //
    const { title, content, boardImageFileList, price, resetBoard } = useBoardStore();


    //          event habdler: 레시피 글 작성하기 버튼 클릭 이벤트 처리 함수          //
    const onRecipeUploadButtonClickHandler = () => {
        navigate(RECIPE_WRITE_PATH());
    }

    //         render: 업로드 버튼 컴포넌트 렌더링          //
    // if (title && content)
    return <div className='recipe-upload-button' onClick={onRecipeUploadButtonClickHandler}>
      <div className='icon-box'>
        <div className='logo-upload-icon'></div>  
      </div>
      <div className='upload-content'>{'글 작성하기'}</div>
    </div>
  }


  const BoardUploadButton = () => {
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    //          event habdler: 자유 게시물 글 작성하기 버튼 클릭 이벤트 처리 함수          //
    const onBoardUploadButtonClickHandler = () => {
      navigate(BOARD_WRITE_PATH());
    }

    //         render: 업로드 버튼 컴포넌트 렌더링          //
    // if (title && content)
    return <div className='board-upload-button' onClick={onBoardUploadButtonClickHandler}>
      <div className='icon-box'>
        <div className='logo-upload-icon'></div>  
      </div>
      <div className='upload-content'>{'글 작성하기'}</div>
    </div>
  }
  










  //          component: 메뉴 컴포넌트          //
  const MenuButton = () => {
    //          render: 메뉴 (가쪽 위치, 메인) 컴포넌트 렌더링          //
    if (isMainPage) {
      return (
        <div className='menu-main'>
            <div className='recipe-board' onClick={onRecipeBoardButtonClickHandler}>{'레시피 게시판'}</div>
            <div className='short'></div>
            <div className='free-board' onClick={onBoardButtonClickHandler}>{'자유 게시판'}</div>
        </div>
      );
    }

    //          render: 메뉴 (중간 위치) 컴포넌트 렌더링          //
    return (
      <div className='menu-others' style={{right: '40%'}}>
        <div className='recipe-board' onClick={onRecipeBoardButtonClickHandler}>{'레시피 게시판'}</div>
        <div className='short'></div>
        <div className='free-board' onClick={onBoardButtonClickHandler}>{'자유 게시판'}</div>
      </div>
    );
  }
  
  //          component: 흙수저 타이틀 컴포넌트          //
  const WebTitle = () => {
    //          render: 흙수저 메인 페이지 타이틀 컴포넌트 렌더링          //
    if (isMainPage) {
      return (
        <div className='title-main' onClick={onLogClickHandler}>{'흙수저 레시피'}</div>
      );
    }

    //          render: 흙수저 게시판 페이지 타이틀 컴포넌트 렌더링          //
    return (
      <div className='title-others' onClick={onLogClickHandler}>{'흙수저 레시피'}</div>
    );
  }

  //          component: 레시피 게시판 타이틀 컴포넌트          //
  const RecipeBoardTitle = () => {
    if (isRecipeBoardWritePage) {
      return (
        <div className='recipe-write-title' onClick={onRecipeBoardButtonClickHandler}>{'레시피 게시판'}</div>
      );
    }
    if (isRecipeBoardPage) {
      return (
        <div className='recipe-board-title' onClick={onRecipeBoardButtonClickHandler}>{'레시피 게시판'}</div>
      );
    }
    return null; // 조건이 맞지 않을 때 null을 반환
  };
  

  //          component: 자유 게시판 타이틀 컴포넌트          //
  const BoardTitle = () => {
    if (isBoardWritePage) {
      return (
        <div className='board-write-title' onClick={onBoardButtonClickHandler}>{'자유 게시판'}</div>
      );
    }
    if (isBoardPage) {
      return (
        <div className='web-board-title' onClick={onBoardButtonClickHandler}>{'자유 게시판'}</div>
      );
    }
    return null; // 조건이 맞지 않을 때 null을 반환
  };

  //          effect: path가 변경될 때마다 실행될 함수          //    
  useEffect(() => {
    setAuthPage(pathname.startsWith(AUTH_PATH()));
    setSignUpPage(pathname.startsWith(SIGN_UP()));
    setMainPage(pathname === MAIN_PATH());
    setBoardPage(pathname.startsWith(BOARD_PATH()));
    setBoardDetailPage(pathname.startsWith(BOARD_DETAIL_PATH('')));
    setBoardWritePage(pathname.startsWith(BOARD_WRITE_PATH()));
    setBoardUpdatePage(pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH('')));
    setRecipeBoardPage(pathname.startsWith(RECIPE_PATH()));
    setRecipeBoardDetailPage(pathname.startsWith(RECIPE_DETAIL_PATH('')));
    setRecipeBoardWritePage(pathname.startsWith(RECIPE_WRITE_PATH()));
    setRecipeBoardUpdatePage(pathname.startsWith(RECIPE_PATH() + '/' + RECIPE_UPDATE_PATH('')));
  }, [pathname]);

  //          effect: login 유저가 변경될 때마다 실행될 함수          //
  useEffect (() => {
    setLogin(loginUser !== null );
  }, [loginUser])

  useEffect(() => {
    console.log('loginUser:', loginUser); // loginUser 값 확인
    console.log('isLogin:', loginUser !== null); // isLogin 조건 확인
  }, [loginUser]);
  
  useEffect(() => {
    console.log("Cookies:", cookies);
  }, [cookies]);


  //          로그인 및 회원가입 페이지에서 빈 화면 렌더링          //
  if (isAuthPage || isSignUpPage) {
    return <div />;
  }
  
  //          render: 헤더 레이아웃 렌더링          //  
  return (
    <div id='header'>
      <div className='header-container'>
      {!(isAuthPage || isSignUpPage) && <AuthButton />}
        <div className='header-middle-box'>
        {!(isBoardWritePage || isRecipeBoardWritePage) && <WebTitle />}
          <BoardTitle />
          <RecipeBoardTitle />
          {!(isAuthPage || isSignUpPage || isBoardWritePage || isRecipeBoardWritePage) && <MenuButton />}
          {(isRecipeBoardPage && !isRecipeBoardWritePage) && <RecipeUploadButton />}
          {(isBoardPage && !isBoardWritePage) && <BoardUploadButton />}
        </div>
        {!(isRecipeBoardWritePage || isBoardWritePage) && <hr className='header-line' />}
      </div>
    </div>
  );
}