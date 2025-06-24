package com.mini2.project_back.controller;

import com.mini2.project_back.domain.FreeBoard;
import com.mini2.project_back.service.MypageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    private final MypageService mypageService;

    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    @GetMapping("/{userid}/liked-posts")
    public ResponseEntity<List<FreeBoard>> getLikedPosts(@PathVariable String userid) {
        List<FreeBoard> likedPosts = mypageService.getLikedPostsByUserId(userid);
        return ResponseEntity.ok(likedPosts);
    }

    @GetMapping("/{userid}/my-posts")
    public ResponseEntity<List<FreeBoard>> getMyPosts(@PathVariable String userid) {
        List<FreeBoard> myPosts = mypageService.getMyPostsByUserId(userid);
        return ResponseEntity.ok(myPosts);
    }
}