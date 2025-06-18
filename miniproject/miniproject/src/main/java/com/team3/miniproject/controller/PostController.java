package com.team3.miniproject.controller;

import com.team3.miniproject.dto.PostDto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = { "http://localhost:5175", "http://localhost:5176" }) // React 개발 주소 허용
public class PostController {

    private List<PostDto> postList = new ArrayList<>();
    private Long idCounter = 1L;

    @GetMapping
    public List<PostDto> getAllPosts() {
        return postList;
    }

    @PostMapping
    public PostDto createPost(@RequestBody PostDto post) {
        post.setId(idCounter++);
        postList.add(post);
        return post;
    }

    @GetMapping("/{id}")
    public PostDto getPostById(@PathVariable Long id) {
        return postList.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
