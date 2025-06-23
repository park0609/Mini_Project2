package com.mini2.project_back.service;

import com.mini2.project_back.domain.Comment;
import com.mini2.project_back.repository.CommentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByDateDesc(postId);
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }
}