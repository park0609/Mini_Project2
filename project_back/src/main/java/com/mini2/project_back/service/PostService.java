package com.mini2.project_back.service;

import com.mini2.project_back.domain.Post;
import com.mini2.project_back.dto.SearchVo;
import com.mini2.project_back.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Map<String, Object> getPagedPosts(SearchVo searchVo) {
        int totalCount = postRepository.countTotalPosts();
        int totalPages = (int) Math.ceil((double) totalCount / searchVo.getSize());
        List<Post> list = postRepository.findPagedPosts(
                searchVo.getStartRow(), searchVo.getEndRow());

        Map<String, Object> result = new HashMap<>();
        result.put("totalCount", totalCount);
        result.put("totalPages", totalPages);
        result.put("currentPage", searchVo.getPage());
        result.put("posts", list);
        return result;
    }
}