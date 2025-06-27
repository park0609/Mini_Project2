package com.mini2.project_back.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mini2.project_back.domain.FreeLikeCount;

public interface FreeLikeRepository extends JpaRepository<FreeLikeCount, Long> {
    Optional<FreeLikeCount> findByFreeIndexAndId(Long freeIndex, String id);

    long countByFreeIndexAndToggle(Long freeIndex, int toggle);
}
