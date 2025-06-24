package com.mini2.project_back.repository;

import com.mini2.project_back.domain.FreeBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBoardRepository extends JpaRepository<FreeBoard, Long> {

    @Query("SELECT fb FROM FreeBoard fb JOIN FreeLike fl ON fb.id = fl.freeIndex " +
            "WHERE fl.id = :userid AND fl.freeLikeToggle = 1 ORDER BY fb.freeDate DESC")
    List<FreeBoard> findLikedPostsByUserId(@Param("userid") String userid);

    List<FreeBoard> findByAuthorIdOrderByFreeDateDesc(String authorId);
}