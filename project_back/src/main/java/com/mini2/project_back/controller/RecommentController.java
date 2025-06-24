package com.mini2.project_back.controller;

import com.mini2.project_back.domain.Recomment;
import com.mini2.project_back.service.RecommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posts/{postId}/comments/{commentId}/recomments")
public class RecommentController {

    private final RecommentService recommentService;

    public RecommentController(RecommentService recommentService) {
        this.recommentService = recommentService;
    }

    @GetMapping
    public ResponseEntity<List<Recomment>> getRecomments(@PathVariable Long commentId) {
        return ResponseEntity.ok(recommentService.getRecommentsByCommentId(commentId));
    }

    @PostMapping
    public ResponseEntity<Recomment> addRecomment(@PathVariable Long commentId,
            @RequestBody Recomment recomment) {
        recomment.setCommentId(commentId);
        return ResponseEntity.ok(recommentService.addRecomment(recomment));
    }
}