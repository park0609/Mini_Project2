package com.mini2.project_back.service;

import com.mini2.project_back.domain.Comment;
import com.mini2.project_back.dto.CommentResponseDTO;
import com.mini2.project_back.dto.RecommentResponseDTO;
import com.mini2.project_back.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public List<CommentResponseDTO> getCommentsWithRecomments(Long postId) {
        List<Comment> comments = commentRepository.findByPostIdWithRecomments(postId);
        return comments.stream().map(c -> {
            CommentResponseDTO dto = new CommentResponseDTO();
            dto.setId(c.getId());
            dto.setPostId(c.getPostId());
            dto.setAuthorId(c.getAuthorId());
            dto.setAuthor(c.getAuthor());
            dto.setContent(c.getContent());
            dto.setDate(c.getDate());
            dto.setRecomments(
                    c.getRecomments().stream().map(r -> {
                        RecommentResponseDTO rdto = new RecommentResponseDTO();
                        rdto.setId(r.getId());
                        rdto.setCommentId(r.getCommentId());
                        rdto.setAuthorId(r.getAuthorId());
                        rdto.setAuthor(r.getAuthor());
                        rdto.setContent(r.getContent());
                        rdto.setDate(r.getDate());
                        return rdto;
                    }).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }
}