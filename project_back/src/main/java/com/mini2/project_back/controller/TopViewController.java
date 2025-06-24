package com.mini2.project_back.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mini2.project_back.domain.FreeBoard;
import com.mini2.project_back.service.TopViewService;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class TopViewController {

    private final TopViewService topViewService;

    public TopViewController(TopViewService topViewService) {
        this.topViewService = topViewService;
    }

    @GetMapping("/top-viewer")
    public List<FreeBoard> getTop5ByViewer() {
        List<FreeBoard> list = topViewService.getTop5ByViewer();
        System.out.println("Top 5 조회 결과: " + list);
        return topViewService.getTop5ByViewer();
    }
}