import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import './style.css';
import { useBoardStore } from 'stores';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AUTH_PATH, MAIN_PATH,BOARD_PATH, RECIPE_PATH } from 'constant';
import { PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import useLoginUserStore from 'stores/login-user.store';

//          component: 레시피 게시판 작성 화면 컴포넌트          //
export default function RecipeBoardWrite() {

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 영역 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  //          state: 금액 입력 영역 요소 참조 상태          //
  const priceRef = useRef<HTMLTextAreaElement | null>(null);

  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { price, setPrice } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();

  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies(); // 5번, 영상에서 token이 있는데도 안돼서 cookie로 바꿈, 42번 영상 27분부터 //


  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //          function: 네비게이트 함수         //
  const navigator = useNavigate();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          event handler: 제목 변경 이벤트 처리          //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);
    if (!titleRef.current) return;
  
    // 높이를 자동으로 설정 후 스크롤 높이만큼 조정
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }

  //           event handler : 내용 변경 이벤트 처리          //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);
    if (!contentRef.current) return;
  
    // 높이를 자동으로 설정 후 스크롤 높이만큼 조정
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

   //          event handler: 가격 변경 이벤트 처리          //
    const onPriceChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const numericValue = Number(value.replace(/[^0-9]/g, '')); // 숫자만 허용
    setPrice(numericValue);

    if (!priceRef.current) return;
  
    // 높이를 자동으로 설정 후 스크롤 높이만큼 조정
    priceRef.current.style.height = 'auto';
    priceRef.current.style.height = `${priceRef.current.scrollHeight}px`;
};

//          event handler: 이미지 변경 이벤트 처리          //
const onImageChangeHanler = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files || !event.target.files.length) return;
  const file = event.target.files[0];

  // 미리 보기용으로 배열을 만든 것 (미리 보기용 url) //
  const imageUrl = URL.createObjectURL(file);
  const newImageUrls = imageUrls.map(item => item);
  newImageUrls.push(imageUrl);
  setImageUrls(newImageUrls);

  // 백엔드에 업로드할 때 사용하는 것 //
  const newBoardImageFileList = boardImageFileList.map(item => item);
  newBoardImageFileList.push(file);
  setBoardImageFileList(newBoardImageFileList);

  // 같은 이미지를 업로드 할 수 있게 해줌 -> 이게 없으면 이미지의 주소가 같아서 변경됐다고 인식을 못하기 때문 //
  if (!imageInputRef.current) return;
  imageInputRef.current.value = '';

}

//          event handler: 이미지 업로드 버튼 클릭 이밴트 처리 (실제 API가 작동되기 전에 이미지가 업로드 되도록 하는 것)          //
const onImageUploadButtonClcikHandler = () => {
  if (!imageInputRef.current) return;
  imageInputRef.current.click();
}
  
//          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
const onImageCloseButtonClickHandler = (deleteindex: number) => {
  if (!imageInputRef.current) return;
  imageInputRef.current.value='';

  const newImageUrls = imageUrls.filter((url, index) => index !== deleteindex);
  setImageUrls(newImageUrls);

  const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteindex);
  setBoardImageFileList(newBoardImageFileList);
} 

  //          effect: 마운트 시 실행할 함수          //
  // 로그인이 안되어 있는 상태이면 못 들어오게 만들어 주는 것 //
  useEffect(() => {
    const accessToken = cookies.accessToken;

    // 로그인이 안되어 있는 상태이면 못 들어오게 함 // (2번) //
    if (!accessToken) {
      navigator(MAIN_PATH());
      return;
    }
    resetBoard();
    /*-------------------------*/
    /* 여기서 부터는 오류 수정 전 42번 영상 27분 25초 */

    /*if (!loginUser) {
      navigator(MAIN_PATH());
      return;
    }
    resetBoard();*/ 

  }, []);


  //          component: 글 작성하기 버튼 컴포넌트          //
  const RecipeWriteCompleteButton = () => {
    //          state: 게시물 상태          //
    const { title, content, boardImageFileList, price, resetBoard } = useBoardStore();

    //          function : post board response 처리 함수          //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
  
      if (code === 'AF' || code === 'NU') navigator(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
  
      /*resetBoard();*/
      // 지우가 레시피 목록 페이지로 이동하도록 수정 //
      alert('게시물이 성공적으로 작성되었습니다.');
      resetBoard();
      navigator(BOARD_PATH());

      /*if (!loginUser) return;
      const {email} = loginUser; // 4번, 우리도 email인지 확인하기  //
      navigate(USER_PATH(email)); */
    
    };
    
  
    const onRecipeWriteCompleteButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        navigator('/auth');
        return;
      }
  
      const requestBody: PostBoardRequestDto = {
        title,
        content,
        image: imageUrls, // 미리 보기 URL로 처리 (API에서 저장된 이미지 URL 필요 시 로직 수정 가능)
        price,
      };
  
      try {
        const response = await postBoardRequest(requestBody, accessToken);
        if (response?.code === 'SU') {
          alert('게시물이 성공적으로 저장되었습니다.');
          resetBoard();
          navigator(RECIPE_PATH());
        } else {
          alert('게시물 저장 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('게시물 저장 오류:', error);
        alert('게시물 저장 중 오류가 발생했습니다.');
      }
    };
  
    return (
      <div
        className="write-complete-button"
        onClick={onRecipeWriteCompleteButtonClickHandler}
      >
        <div className="complete-title">{'작성 완료'}</div>
      </div>
    );
  };
  

 

  //          render: 레시피 게시판 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='recipe-board-write-wrapper'>
      <div className='recipe-board-write-container'>
        <div className='recipe-board-write-tool-box'>
          <div className='tool-icon-box'>
            <div className='write-menu-icons'>
              <div className='icon image-box-light-icon' onClick={onImageUploadButtonClcikHandler}></div>
              <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageChangeHanler} />
            </div>
          </div>
        </div>
        <div className='recipe-board-price-box'>
          <div className='price-title'>{'예상 비용'}</div>
          <hr className='price-line' />
          <textarea ref={priceRef} className='recipe-price-textarea' placeholder='금액을 입력하세요' value={price.toString()} onChange={onPriceChangeHandler} />
          <div className='won-icon'></div>
        </div>
        <RecipeWriteCompleteButton />
        <div className='recipe-board-write-box'>
          <div className='recipe-board-write-title-box'>
            <textarea 
              ref = {titleRef}
              className='board-write-title-textarea' 
              placeholder='제목' 
              value={title} 
              onChange={onTitleChangeHandler}
              rows={1}
            />
          </div>
          <div className='divider'>
            <hr className = 'title-divder' />
          </div>
          <div className='recipe-board-write-content-box'>
            <textarea 
              ref={contentRef} 
              className='board-write-content-textarea' 
              placeholder='오늘의 레시피는 ...' 
              value={content} 
              onChange={onContentChangeHandler}
            />
          </div>
          <div className='recipe-board-write-images-box'>
            {imageUrls.map((imageUrl, index) => 
              <div className='recipe-board-write-image-box' key={index}>
              <img className='recipe-board-write-image' src={imageUrl} />
                <div className='icon-button'>
                  <div className='tool-icon-box image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                    <div className='icon close-icon'></div>
                  </div>
                </div>  
              </div>
            )}
            

          </div>
        </div>
      </div>
    </div>
  );
}

