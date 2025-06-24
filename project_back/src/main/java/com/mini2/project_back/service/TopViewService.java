package com.mini2.project_back.service;

import org.springframework.stereotype.Service;

import com.mini2.project_back.domain.FreeBoard;
import com.mini2.project_back.repository.TopViewRepository;

import java.util.List;

@Service
public class TopViewService {

    private final TopViewRepository topViewRepository;

    public TopViewService(TopViewRepository topViewRepository) {
        this.topViewRepository = topViewRepository;
    }

    public List<FreeBoard> getTop5ByViewer() {
        return topViewRepository.findTop5ByViewer();
    }
}