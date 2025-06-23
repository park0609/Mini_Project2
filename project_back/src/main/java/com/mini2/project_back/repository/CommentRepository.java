package com.mini2.project_back.repository;

import com.mini2.project_back.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByDateDesc(Long postId);
}