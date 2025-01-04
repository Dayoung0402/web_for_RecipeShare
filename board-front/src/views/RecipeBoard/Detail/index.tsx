import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { Board, CommentListItem } from 'types/interface';
import StarRating from 'components/StarRating';
import { useNavigate, useParams } from 'react-router-dom';
import { boardMock } from 'mocks';
import useCommentStore from 'stores/comment';
import { MAIN_PATH, RECIPE_DETAIL_PATH } from 'constant';
import { getBoardRequest } from 'apis';
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto';
import { ResponseDto } from 'apis/response';
import useLoginUserStore from 'stores/login-user.store';

//          component: 레시피 게시판 상세 화면 컴포넌트          //
export default function RecipeBoardDetail() {

  //          state: 게시물 번호 path variable 상태          //
  const { boardNumber } = useParams();


  //           function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          state: 댓글 영역 요소 참조 상태          //
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  //          state: 댓글 상태           //
  const {comment, setComment} = useCommentStore();

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

 

  
  //          component: 게시물 상세 상단 컴포넌트          //
  const BoardDetailTop = () => {

    //          state: more 버튼 상태          //
    const [board, setBoard] = useState<Board | null>(null);

    //          function : get board response 처리 함수          //
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert ('존재하지 않는 게시물 입니다');
      if (code === 'DBE') alert ('데이터 베이스 오류입니다.');

      if (code !== 'SU') {
        navigator(MAIN_PATH());
        return;
      }

      const board : Board = { ...responseBody as GetBoardResponseDto };
      setBoard(board);
    }

      
    //          effect: 게시물 번호 path variable이 바뀔때 마다 게시물 불러오기          //
    useEffect(() => {
      if (!boardNumber) {
        navigator(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    //          event handler : 입력 완료 버튼 누를 시, 레시피 게시판 페이지로 돌아가기          //


    //          render: 게시물 상세 상단 컴포넌트 렌더링          //
    if (!board) return <></>
    return (
      <div id = 'recipe-board-detail-top'>
        <div className = 'recipe-board-info-box'>
          <div className = 'recipe-user-info-box'>
            <div className = 'user-image-icon'></div>
            <div className = 'user-name-box'>{board.writerNickname}{' 님의 글'}</div>
          </div>
          <div className = 'recipe-user-calender-box'>{board.writeDatetime}</div>
        </div>
        <div className = 'recipe-board-detail-box'>
          <div className = 'recipe-detail-button'>
            <div className = 'correct-button'>
              <div className = 'correct-icon'></div>
              <div className = 'correct-button-content'>{'수정하기'}</div>
            </div>
            <div className = 'delete-button'>
              <div className = 'delete-icon'></div>
              <div className = 'delete-button-content'>{'삭제하기'}</div>
            </div>
          </div>
          <div className = 'recipe-detail-box-header'>
            <div className = 'recipe-detail-box-title'>{board.title}</div>
            <div className = 'recipe-detail-box-title-content'>{'예상 비용 : 약 '}{board.price}{'₩'}</div>
          </div>
          <div className = 'recipe-detail-box-content'>
            <div className = 'recipe-detail-box-write-content'>{board.content}</div>
            {board.boardImageList.map(image => <img className="recipe-detail-box-image-box" src={image} />)}
          </div>
        </div>
      </div>

    );
  };

  //          component: 게시물 상세 하단 컴포넌트          //
  const BoardDetailBottom = () => {
    //          event handler: 댓글 변경 이벤트 처리          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      
      if (!commentRef.current) return;
    
      // 높이를 자동으로 설정 후 스크롤 높이만큼 조정
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
       //          입력 완료 버튼 클릭 핸들러          //
    const onCompleteButtonClickHandler = () => {
      if (!boardNumber) return;
      navigator(RECIPE_DETAIL_PATH(boardNumber)); // 현재 게시물로 다시 이동
    };
    
    //          render: 게시물 상세 하단 컴포넌트 렌더링          //
    return (
      <div id = 'recipe-board-detail-bottom'>
        <div className = 'recipe-board-rating-box'>
            <div className = 'rate-icon'></div>
            <div className = 'rate-content'>{'4.9'}</div>
          </div>

        <div className = 'recipe-board-write-comment-box'>
          
          <div className = 'input-rate-star-container'>
            <div className = 'input-rate-star-title'>{'평가하기'}</div>
            <div className = 'input-rate-star'>
              <StarRating />
            </div>
          </div>

          <div className = 'comment-input-profile-box'>
            <div className = 'comment-profile-icon'></div>
              <div className = 'input-container'>
                <textarea className = 'recipe-board-comment-textare' placeholder='힘이 되는 한마디...!' value={comment.toString()} onChange={onCommentChangeHandler}/>
            </div>
          </div>

          <div className = 'comment-complete-button-box'>
            <div className = 'save-icon'></div>
            <div className = 'comment-complete-title' onClick={onCompleteButtonClickHandler}>{'입력 완료'}</div>
          </div>

        </div>
        <div className = 'recipe-board-view-comment-box'>
          <div className = 'recipe-board-comment-title'>{'댓글 (2)'}</div>
            <div className = 'recipe-board-comment-list-container'>
              <div className = 'comment-view-user-icon'></div>
              <div className = 'person-name'>{'쥬'}</div>
              <div className = 'triangle-icon'></div>
              <div className = 'comment-content'>{'이거 해봤는데 엄청 맛있어요!'}</div>
          </div>

          <hr className = 'comment-dotted-line' />

            <div className = 'recipe-board-comment-list-container'>
              <div className = 'comment-view-user-icon'></div>
              <div className = 'person-name'>{'혜오니'}</div>
              <div className = 'triangle-icon'></div>
              <div className = 'comment-content'>{'브리치즈가 고소해서 엄청 잘 어울려요 최애 파스타됨'}</div>
          </div>
        </div>
      </div>
    
    );
  };

  //          render: 레시피 게시판 상세 화면 컴포넌트 렌더링          //
  return (
    <div id = 'board-detail-wrapper'>
      <div className = 'board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}