package com.mini2.project_back.service;

import com.mini2.project_back.dto.TopLikeDTO;
import com.mini2.project_back.repository.TopLikeRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TopLikeService {

    private final TopLikeRepository topLikeRepository;

    public TopLikeService(TopLikeRepository topLikeRepository) {
        this.topLikeRepository = topLikeRepository;
    }

    public List<TopLikeDTO> getTop5ByLike() {
        List<TopLikeDTO> result = topLikeRepository.findTop5ByLike();
        return result.size() > 5 ? result.subList(0, 5) : result;
    }
}