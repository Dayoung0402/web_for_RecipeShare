// 최신 게시물 리스트 //

import { BoardListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetLatestBoardListReponseDto extends ResponseDto {
    latestList: BoardListItem[];
}