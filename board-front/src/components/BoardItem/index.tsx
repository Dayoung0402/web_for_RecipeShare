import React from 'react';
import './style.css';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH, RECIPE_DETAIL_PATH } from 'constant';
import star5 from "../../assets/images/rate.png";

interface Props {
    boardlistItem: BoardListItem;
}

// 컴포넌트: BoardList 컴포넌트
export default function BoardItem({ boardlistItem }: Props) {
    // Properties
    const { boardNumber, title, content, boardTitleImage, price } = boardlistItem;

    // 네비게이트 함수
    const navigator = useNavigate();

    // 게시물 아이템 클릭 이벤트 처리 함수
    const onClickBoardItemHandler = () => {
        navigator(RECIPE_DETAIL_PATH(boardNumber));
    };

    // Content를 최대 20자로 제한하고 '...' 추가
    const truncatedContent = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    // Render
    return (
        <div className="board-list-item">
            <div className="recipe-card" onClick={onClickBoardItemHandler}>
                <div className="recipe-image">
                    <img src={boardTitleImage || '../../assets/ju/emptyImage.png'} alt={title || '이미지 없음'} />
                </div>

                <div className="favorite-count">
                    평점:
                    <div className="star-ratings">
                        <img src={star5} alt={'평점'} />
                    </div>
                </div>

                <div className="price">약 {price} 냥</div>

                <hr className="line" />

                <div className="title">{title}</div>

                <div className="content">{truncatedContent(content, 45)}</div>
            </div>
        </div>
    );
}
