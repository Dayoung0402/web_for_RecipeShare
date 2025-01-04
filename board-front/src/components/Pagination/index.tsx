import React, { Dispatch, SetStateAction } from "react";
import './style.css';

//          interface: 페이지네이션 컴포넌트 Properties          //
interface Props {
    currentPage: number ;
    currentSection: number ;
    setCurrentPage : Dispatch<SetStateAction<number>> ;
    setCurrentSection: Dispatch<SetStateAction<number>> ;

    viewPageList: number[];
    totalSection: number;
}


//          component: 페이지네이션 컴포넌트          //
export default function Pagination(props: Props) {

    //          state: Properties          //
    const { currentPage, currentSection, viewPageList, totalSection } = props;
    const { setCurrentPage, setCurrentSection } = props;

    //          event Handler: 페이지 클릭 이벤트 처리          //
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
        console.log("Page clicked:", page); 
    }

    //          event Handler: 이전 클릭 이벤트 처리        //
    const onPreviousClickHandler = () => {
        if (currentSection === 1) return;
        setCurrentPage((currentSection -1) * 3);
        setCurrentSection((currentSection -1));
    }

    //          event Handler: 다음 클릭 이벤트 처리        //
    const onNextClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentPage(currentSection * 3 + 1);
        setCurrentSection(currentSection + 1);
    }

    //          render: 페이지네이션 컴포넌트 렌더링          //
    return (
        <div id = 'pagination-wrapper'>
            <div className = 'pagination-change-link-box'>
                <div className = 'left-direction-icon' onClick = {onPreviousClickHandler}></div>
            </div>

            <div className='pagination-divider'>
                <div className = 'etc-icon'></div>
            </div>

            {viewPageList.map((page) => 
    page === currentPage ? (
        <div key={page} className='pagination-text-active'>{page}</div>
    ) : (
        <div key={page} className='pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
    )
)}

            <div className='pagination-divider'>
                <div className = 'etc-icon'></div>
            </div>

            <div className='pagination-change-link-box'>
                <div className = 'right-direction-icon' onClick = {onNextClickHandler}></div>
            </div>
        </div>
    )
}
