package com.mini2.project_back.repository;

import com.mini2.project_back.domain.FreeBoard;
import com.mini2.project_back.dto.TopLikeDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import java.util.List;

public interface TopLikeRepository extends Repository<FreeBoard, Long> {

    @Query(value = "SELECT new com.mini2.project_back.dto.TopLikeDTO(" +
            " fb.id, fb.title, fb.author, fb.viewer, COUNT(fl) ) " +
            "FROM FreeBoard fb " +
            "JOIN FreeLike fl ON fb.id = fl.freeIndex " +
            "WHERE fl.freeLikeToggle = 1 " +
            "GROUP BY fb.id, fb.title, fb.author, fb.viewer " +
            "ORDER BY COUNT(fl) DESC")
    List<TopLikeDTO> findTop5ByLike();
}