package com.jiraynor.board_back.service;

import org.springframework.http.ResponseEntity;
import com.jiraynor.board_back.dto.request.board.PostBoardRequestDto;
import com.jiraynor.board_back.dto.response.board.GetBoardResponseDto;
import com.jiraynor.board_back.dto.response.board.GetTop3BoardListResponseDto;
import com.jiraynor.board_back.dto.response.board.GetLatestBoardListResponseDto;
import com.jiraynor.board_back.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

    // 보드 존재 여부를 확인하는 메서드 추가
    boolean boardExists(Integer boardNumber);

}
