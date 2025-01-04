package com.jiraynor.board_back.service;

// 35번 영상 중에서 UserServiceImplement.java 파일을 만드는 부분이 있는데 UserServiceImplement.java 이 파일은 UserService 
// 라는 인터페이스 클래스의 구현 부분임. 근데 동영상에 없음...뒤지고 있음
// 그래서 일단 필요한 부분 검색해서 찾아 적어놓음. 
import org.springframework.http.ResponseEntity;
import com.jiraynor.board_back.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

    
}
