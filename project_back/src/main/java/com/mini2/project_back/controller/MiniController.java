package com.mini2.project_back.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mini2.project_back.domain.Post;
import com.mini2.project_back.repository.PostRepository;

@RestController
@RequestMapping("/posts") // 컨트롤러의 모든 API가 /post 경로에서 동작함
public class MiniController {

    private final PostRepository postRepository; // 실제 데이터베이스 작업을 하는 곳(게시글 데이터 갖고와주는 역할)

    // Repository 주입
    public MiniController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // // 전체 게시글 목록 조회
    // @GetMapping
    // public List<Post> getAllPosts() {
    // return postRepository.findAll();
    // }

    // 게시글 작성
    @PostMapping("/commit")
    public Post createPost(@RequestBody Post post) { // post를 요청 본문의 데이터로 만들기
        return postRepository.save(post); // 요청본문
    }

    // 게시물 수정
    @PutMapping("/posts/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody Post post) {
        Optional<Post> optionalPost = postRepository.findById(id);

        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.setTitle(post.getTitle());
            existingPost.setContent(post.getContent());
            existingPost.setAuthor(post.getAuthor());
            existingPost.setDate(post.getDate());

            postRepository.save(existingPost); // 수정된 내용 저장
            return ResponseEntity.ok("수정 성공");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글이 없습니다.");
        }
    }

    // 수정할 내용 본문에 보여지게 하기
    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            return ResponseEntity.ok(post.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 삭제 기능
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
