package com.mini2.project_back.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mini2.project_back.domain.FreeLikeCount;
import com.mini2.project_back.repository.FreeLikeRepository;

@Service
public class FreeLikeService {

    private final FreeLikeRepository freeLikeRepo;

    public FreeLikeService(FreeLikeRepository freeLikeRepo) {
        this.freeLikeRepo = freeLikeRepo;
    }

    // 좋아요 토글 기능
    public boolean toggleLike(Long freeIndex, String id) {
        Optional<FreeLikeCount> existing = freeLikeRepo.findByFreeIndexAndId(freeIndex, id);

        if (existing.isPresent()) {
            FreeLikeCount like = existing.get();
            like.setToggle(like.getToggle() == 1 ? 0 : 1);
            freeLikeRepo.save(like);
            return like.getToggle() == 1;
        } else {
            FreeLikeCount newLike = new FreeLikeCount();
            newLike.setTable_index(freeIndex);
            newLike.setId(id);
            newLike.setToggle(1);
            freeLikeRepo.save(newLike);
            return true;
        }
    }

    public long getLikeCount(Long freeIndex) {
        return freeLikeRepo.countByFreeIndexAndToggle(freeIndex, 1); // 좋아요만 카운트
    }

    public boolean hasUserLiked(Long freeIndex, String id) {
        return freeLikeRepo.findByFreeIndexAndId(freeIndex, id)
                .map(FreeLikeCount::getToggle)
                .orElse(0) == 1;
    }
}
