package com.mini2.project_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mini2.project_back.domain.FreeBoard;

import java.util.List;

@Repository
public interface TopViewRepository extends JpaRepository<FreeBoard, Long> {
    @Query(value = "SELECT * FROM (SELECT * FROM FREE_BOARD ORDER BY FREE_VIEWER DESC) WHERE ROWNUM <= 5", nativeQuery = true)
    List<FreeBoard> findTop5ByViewer();

}