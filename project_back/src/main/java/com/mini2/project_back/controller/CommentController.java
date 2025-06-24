package com.mini2.project_back.controller;

import com.mini2.project_back.domain.Comment;
import com.mini2.project_back.dto.CommentResponseDTO;
import com.mini2.project_back.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getCommentsWithRecomments(@PathVariable Long postId) {
        List<CommentResponseDTO> dtos = commentService.getCommentsWithRecomments(postId);
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        comment.setPostId(postId);
        Comment saved = commentService.addComment(comment);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}