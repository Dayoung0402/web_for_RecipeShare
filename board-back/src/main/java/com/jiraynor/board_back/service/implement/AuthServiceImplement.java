package com.jiraynor.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jiraynor.board_back.dto.request.auth.SignInRequestDto;
import com.jiraynor.board_back.dto.request.auth.SignUpRequestDto;
import com.jiraynor.board_back.dto.response.ResponseDto;
import com.jiraynor.board_back.dto.response.auth.SignInResponseDto;
import com.jiraynor.board_back.dto.response.auth.SignUpResponseDto;
import com.jiraynor.board_back.entity.UserEntity;
import com.jiraynor.board_back.provider.JwtProvider;
import com.jiraynor.board_back.repository.UserRepository;
import com.jiraynor.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
 
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {


        try {

            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if(existedEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existednickname = userRepository.existsByNickname(nickname);
            if(existednickname) return SignUpResponseDto.duplicateNickname(); 
            
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {

            String email = dto.getEmail(); // SignInResponseDto.java에 line 17 추가함
            UserEntity userEntity = userRepository.findByEmail(email); //인자 email 추가함
            if (userEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();// SignInResponseDto.java에 line 18 추가함
            String encodePassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodePassword);
            if(!isMatched) return SignInResponseDto.signInFailed();

            token = jwtProvider.create(email);


        } catch(Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }
    
}
