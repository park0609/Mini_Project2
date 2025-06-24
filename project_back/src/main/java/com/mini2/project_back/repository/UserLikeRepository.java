package com.mini2.project_back.repository;

import com.mini2.project_back.domain.FreeLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeRepository extends JpaRepository<FreeLike, Long> {
}