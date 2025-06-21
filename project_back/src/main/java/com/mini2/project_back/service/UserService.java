package com.mini2.project_back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mini2.project_back.dto.UserDTO;
import com.mini2.project_back.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 로그인
    public String login(String userid, String rawPassword) throws Exception {
        String hashedPassword = userRepository.loginDB(userid);
        if (hashedPassword != null && passwordEncoder.matches(rawPassword, hashedPassword)) {
            // 토큰 대신 간단하게 userId + timestamp
            return userid + "-" + System.currentTimeMillis();
        }
        throw new Exception("INVALID_CREDENTIALS");
    }

    // 간단 검증: "-" 포함 여부
    public boolean validateToken(String token) {
        return token != null && token.contains("-");
    }

    // 회원가입
    public void signup(UserDTO user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        int result = userRepository.insertUser(user);
        if (result == 0) {
            throw new Exception("INSERT_FAILED");
        }
    }

    // 아이디 찾기
    public List<String> findIdsByPassword(String inputPassword) {
        return userRepository.findIdsByPassword(inputPassword, passwordEncoder);
    }

    // 비밀번호 찾기
    public String updateToTempPassword(String userid) {
        if (!userRepository.existsById(userid)) {
            return null;
        }

        // 랜덤 4자리 숫자 생성
        String tempPw = String.format("%04d", (int) (Math.random() * 10000));
        // 암호화
        String hashed = passwordEncoder.encode(tempPw);
        // DB 업데이트
        userRepository.updatePassword(userid, hashed);
        System.out.println("임시 비밀번호: " + tempPw);
        return tempPw;
    }

    // 쿠키에서 정보 가져오기
    public UserDTO getUserInfoById(String userId) {
        return userRepository.findById(userId);
    }

    // 회원정보 수정하기
    public boolean modifyUser(UserDTO userDto) {
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            // 암호화 수행
            String encodedPassword = passwordEncoder.encode(userDto.getPassword());
            userDto.setPassword(encodedPassword);
        } else {
            return false;
        }
        try {
            int rows = userRepository.updateUser(userDto);
            return rows > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}