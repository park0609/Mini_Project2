package com.mini2.project_back.service;

import com.mini2.project_back.domain.FreeBoard;
import com.mini2.project_back.repository.UserBoardRepository;
import com.mini2.project_back.repository.UserLikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MypageService {

    private final UserBoardRepository freeBoardRepository;
    // private final FreeLikeRepository freeLikeRepository;

    public MypageService(UserBoardRepository freeBoardRepository, UserLikeRepository freeLikeRepository) {
        this.freeBoardRepository = freeBoardRepository;
        // this.freeLikeRepository = freeLikeRepository;
    }

    public List<FreeBoard> getLikedPostsByUserId(String userid) {
        return freeBoardRepository.findLikedPostsByUserId(userid);
    }

    public List<FreeBoard> getMyPostsByUserId(String userid) {
        return freeBoardRepository.findByAuthorIdOrderByFreeDateDesc(userid);
    }
}