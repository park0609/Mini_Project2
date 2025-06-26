package com.mini2.project_back.controller;

import com.mini2.project_back.dto.TopLikeDTO;
import com.mini2.project_back.service.TopLikeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/board")
public class TopLikeController {

    private final TopLikeService topLikeService;

    public TopLikeController(TopLikeService topLikeService) {
        this.topLikeService = topLikeService;
    }

    @GetMapping("/top-like")
    public List<TopLikeDTO> getTop5ByLike() {
        return topLikeService.getTop5ByLike();
    }
}