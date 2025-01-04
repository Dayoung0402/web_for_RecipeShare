import React, { useEffect, useState } from 'react';
import './style.css';
import Pagination from 'components/Pagination';
import BoardItem from 'components/BoardItem';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock, top3BoardListMock } from 'mocks';
import { usePagination } from 'hooks';
import { getLatestBoardListRequest } from 'apis';
import { GetLatestBoardListReponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';



//          component: 레시피 리스트 게시판 화면 컴포넌트         //
export default function RecipeBoardList() {

  //          component: 게시물 리스트 게시판 상단 컴포넌트          //
  const RecipeBoardListTop = () => {

    //          state: 최신 게시물 리스트 상태(임시)          //
    //const [currentBoardList, setCurrentBoardList] = useState<BoardListItem[]>([]);//

     //          state: 페이지 네이션 관련 상태          //
     const { 
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList
  } = usePagination<BoardListItem>(3);

  //          function: get latest board list response 처리          //
  const getLatestBoardListResponse = (responseBody: GetLatestBoardListReponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if ( code === 'DBE' ) alert ('데이터 베이스 오류입니다.');
    if ( code !== 'SU' ) return;

    const { latestList } = responseBody as GetLatestBoardListReponseDto;
    setTotalList(latestList);
  }


    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect (() =>{
      getLatestBoardListRequest().then(getLatestBoardListResponse);
    }, []);

    //useEffect(() => {
      // 목데이터를 페이지네이션 훅에 설정
      //setTotalList(latestBoardListMock);  // API 연동 후 삭제하기 
    //}, []);//

    //          render: 게시물 리스트 게시판 상단 컴포넌트 렌데링          //
    return (
      <div id = 'recipe-board-list-top-wrapper'>
        <div className = 'recipe-board-list-current-contents'>
        {viewList.map((boardListItem) => (
  <BoardItem key={boardListItem.boardNumber} boardlistItem={boardListItem} />
))}
        </div>
        <div className = 'recipe-board-list-bottom-pagination-box'>
          <Pagination
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
          />
        </div>
      </div>
    )
  }

  //          render: 레시피 리스트 게시판 화면 컴포넌트 렌더링          //

  return (
    <div id = 'recipe-board-list-wrapper'>
      <div className = 'recipe-board-list-container'>
        <RecipeBoardListTop />
      </div>
    </div>
  )

}
