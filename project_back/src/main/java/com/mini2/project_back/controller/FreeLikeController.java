package com.mini2.project_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mini2.project_back.service.FreeLikeService;

@RestController
@RequestMapping("/like")
public class FreeLikeController {

    private final FreeLikeService likeService;

    public FreeLikeController(FreeLikeService likeService) {
        this.likeService = likeService;
    }

    // 좋아요 토글
    @PostMapping("/{postId}")
    public ResponseEntity<String> toggleLike(@PathVariable("postId") Long postId,
            @RequestParam("userId") String userId) {
        boolean liked = likeService.toggleLike(postId, userId);
        return ResponseEntity.ok(liked ? "Liked" : "Unliked");
    }

    // 좋아요 개수 조회
    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable("postId") Long postId) {
        long count = likeService.getLikeCount(postId);
        return ResponseEntity.ok(count);
    }

    // 좋아요 상태 확인
    @GetMapping("/status/{postId}")
    public ResponseEntity<Boolean> getLikeStatus(@PathVariable("postId") Long postId,
            @RequestParam("userId") String userId) {
        boolean liked = likeService.hasUserLiked(postId, userId);
        return ResponseEntity.ok(liked);
    }
}
