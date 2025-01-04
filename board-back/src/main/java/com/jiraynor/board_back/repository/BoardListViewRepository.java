package com.jiraynor.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jiraynor.board_back.entity.BoardListViewEntity;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();

    @Query(value = "SELECT * FROM board_list_view ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<BoardListViewEntity> findTop3ByRandom();
}
