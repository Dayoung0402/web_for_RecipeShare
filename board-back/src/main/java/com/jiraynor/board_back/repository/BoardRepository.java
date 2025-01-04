package com.jiraynor.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jiraynor.board_back.entity.BoardEntity;
import com.jiraynor.board_back.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

        boolean existsByBoardNumber(Integer boardNumber);

        BoardEntity findByBoardNumber(Integer boardNumber);

        @Query(value = "SELECT " +
                        "B.board_number AS boardNumber, " +
                        "B.title AS title, " +
                        "B.content AS content, " +
                        "B.write_datetime AS writeDatetime, " +
                        "B.writer_email AS writerEmail, " +
                        "B.price AS price, " +
                        "U.nickname AS writerNickname " +
                        "FROM board AS B " +
                        "INNER JOIN user AS U " +
                        "ON B.writer_email = U.email " +
                        "WHERE board_number = ?1; ", nativeQuery = true)

        GetBoardResultSet getBoard(Integer boardNumber);

        // 메인페이지에서 3개를 가지고 오는 쿼리
        @Query(value = "SELECT * FROM board ORDER BY RAND() LIMIT 3", nativeQuery = true)
        List<BoardEntity> findRandomBoards();

}
