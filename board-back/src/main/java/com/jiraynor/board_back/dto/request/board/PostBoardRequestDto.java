package com.jiraynor.board_back.dto.request.board;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostBoardRequestDto {

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    
    private List<String> image; //11.20 수정 부분

    @NotNull
    private int price;
    
}
