package com.mini2.project_back.repository;

import com.mini2.project_back.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByDateDesc(Long postId);

    @Query("SELECT DISTINCT c FROM Comment c LEFT JOIN FETCH c.recomments WHERE c.postId = :postId ORDER BY c.date DESC")
    List<Comment> findByPostIdWithRecomments(@Param("postId") Long postId);

}