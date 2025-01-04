import React, { useEffect, useState } from "react";
import './style.css';
import { top3BoardListMock } from "mocks";
import { BoardListItem } from "types/interface";
import Top3Item from 'components/Top3Item';
import Banner from "components/Banner";
import { bannerMock } from "mocks/bannerMock";
import { getTop3BoardListRequest } from "apis";
import { useNavigate } from "react-router-dom";
import { GetTop3BoardListResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import { usePagination } from "hooks";

export default function Main() {

    const MainTop = () => {
        return (
            <div id='main-top-wrapper'>
                <div className='main-top-container'>
                    <div className='main-top-banner'>
                        <Banner data={bannerMock} />
                    </div>
                </div>
            </div>
        );
    };

    const MainBottom = () => {


        //          function: 네비게이트 함수          //
        const navigate = useNavigate();

        //          state: 주간 Top3 게시물 리스트 상태           //
        const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

        //          function: get top3 board list response 처리 함수          //
        const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
            if (!responseBody) return;
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;

            const { top3List } = responseBody as GetTop3BoardListResponseDto;
            setTop3BoardList(top3List);
        };

        //          effect: 첫 마운트 시 실행될 함수          //
        useEffect(() => {
            getTop3BoardListRequest().then(getTop3BoardListResponse);
        }, []);

        return (
            <div id='main-bottom-wrapper'>
                <div className='main-bottom-container'>
                    <div className='main-bottom-title'></div>
                    <div className='main-bottom-contents-box'>
                        <div className='today-menu'>
                            <div className='left-main-icon'></div>
                            <div className='main-bottom-contents-title'>오늘의 메뉴</div>
                            <div className='right-main-icon'></div>
                        </div>
                        <div className='main-bottom-contents'>
                            {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <MainTop />
            <MainBottom />
        </>
    );
}
