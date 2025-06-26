package com.mini2.project_back.repository;

import com.mini2.project_back.domain.Recomment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommentRepository extends JpaRepository<Recomment, Long> {
    List<Recomment> findByCommentIdOrderByDateDesc(Long commentId);

    List<Recomment> findByCommentIdOrderByDateAsc(Long commentId);
}