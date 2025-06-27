package com.mini2.project_back.service;

import com.mini2.project_back.domain.Comment;
import com.mini2.project_back.domain.Recomment;
import com.mini2.project_back.repository.CommentRepository;
import com.mini2.project_back.repository.RecommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecommentService {

    private final RecommentRepository recommentRepository;
    private final CommentRepository commentRepository;

    public RecommentService(RecommentRepository recommentRepository, CommentRepository commentRepository) {
        this.recommentRepository = recommentRepository;
        this.commentRepository = commentRepository;
    }

    public Recomment addRecomment(Long commentId, Recomment recomment) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다: " + commentId));
        recomment.setCommentId(comment.getId());
        recomment.setDate(LocalDateTime.now());
        return recommentRepository.save(recomment);
    }

    public void deleteRecomment(Long recommentId) {
        recommentRepository.deleteById(recommentId);
    }

    public List<Recomment> getRecommentsByCommentId(Long commentId) {
        return recommentRepository.findByCommentIdOrderByDateAsc(commentId);
    }
}