package com.mini2.project_back.controller;

import com.mini2.project_back.dto.SearchVo;
import com.mini2.project_back.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/board")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getBoard(SearchVo searchVo) {
        Map<String, Object> pageData = postService.getPagedPosts(searchVo);
        return ResponseEntity.ok(pageData);
    }
}