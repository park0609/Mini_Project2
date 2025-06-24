package com.mini2.project_back.service;

import com.mini2.project_back.domain.Recomment;
import com.mini2.project_back.repository.RecommentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecommentService {

    private final RecommentRepository recommentRepository;

    public RecommentService(RecommentRepository recommentRepository) {
        this.recommentRepository = recommentRepository;
    }

    public List<Recomment> getRecommentsByCommentId(Long commentId) {
        return recommentRepository.findByCommentId(commentId);
    }

    public Recomment addRecomment(Recomment recomment) {
        return recommentRepository.save(recomment);
    }
}