package com.mini2.project_back.controller;

import com.mini2.project_back.domain.Recomment;
import com.mini2.project_back.service.RecommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts/{postId}")
public class RecommentController {

    private final RecommentService recommentService;

    public RecommentController(RecommentService recommentService) {
        this.recommentService = recommentService;
    }

    @GetMapping("/comments/{commentId}/recomments")
    public ResponseEntity<List<Recomment>> getRecomments(@PathVariable Long commentId) {
        List<Recomment> recomments = recommentService.getRecommentsByCommentId(commentId);
        return ResponseEntity.ok(recomments);
    }

    @PostMapping("/comments/{commentId}/recomments")
    public ResponseEntity<Recomment> addRecomment(@PathVariable Long commentId, @RequestBody Recomment recomment) {
        recomment.setCommentId(commentId);
        Recomment saved = recommentService.addRecomment(commentId, recomment);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/recomments/{recommentId}")
    public ResponseEntity<Void> deleteRecomment(@PathVariable Long recommentId) {
        recommentService.deleteRecomment(recommentId);
        return ResponseEntity.ok().build();
    }
}