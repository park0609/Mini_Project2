package com.mini2.project_back.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mini2.project_back.dto.UserDTO;
import com.mini2.project_back.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
        try {
            String token = userService.login(body.get("userid"), body.get("password"));
            String safeToken = Base64.getEncoder().encodeToString(token.getBytes(StandardCharsets.UTF_8));

            // HttpOnly 쿠키 생성
            ResponseCookie cookie = ResponseCookie.from("token", safeToken)
                    .httpOnly(true)
                    .secure(false) // HTTPS 환경에서는 true
                    .path("/")
                    .sameSite("Strict")
                    .build();

            long expiresAt = System.currentTimeMillis() + (30 * 1000);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "로그인 성공", "expiresAt", expiresAt));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("FAIL");
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // 쿠키 제거
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("로그아웃 성공");
    }

    // 쿠키에서 정보 가져오기
    @GetMapping("/search-cookie")
    public ResponseEntity<?> searchCookie(@CookieValue(name = "token", required = false) String safeToken) {
        if (safeToken == null) {
            return ResponseEntity.status(401).body("UNAUTHORIZED");
        }

        try {
            // Base64 디코딩
            byte[] decodedBytes = Base64.getDecoder().decode(safeToken);
            String token = new String(decodedBytes, StandardCharsets.UTF_8);

            // token: userId-타임스탬프
            String[] parts = token.split("-");
            String userId = parts[0];

            // DB 조회 (userService에 메서드 추가)
            UserDTO userinfo = userService.getUserInfoById(userId);
            if (userinfo != null) {
                return ResponseEntity.ok(userinfo);
            } else {
                return ResponseEntity.status(404).body("USER NOT FOUND");
            }

        } catch (Exception e) {
            return ResponseEntity.status(400).body("INVALID TOKEN");
        }
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO user) {
        try {
            userService.signup(user);
            return ResponseEntity.ok("SIGNUP SUCCESS");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // 로그인 상태확인
    @GetMapping("/checklog")
    public ResponseEntity<?> authMe(@CookieValue(name = "token", required = false) String safeToken) {
        if (safeToken == null) {
            return ResponseEntity.status(401).body("UNAUTHORIZED");
        }
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(safeToken);
            String token = new String(decodedBytes, StandardCharsets.UTF_8);
            String[] parts = token.split("-");
            String userId = parts[0];

            // 실제 DB 조회
            UserDTO userinfo = userService.getUserInfoById(userId);
            if (userinfo != null) {
                return ResponseEntity.ok(Map.of("username", userinfo.getUsername()));
            } else {
                return ResponseEntity.status(401).body("UNAUTHORIZED");
            }

        } catch (Exception e) {
            return ResponseEntity.status(400).body("INVALID TOKEN");
        }
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<?> findIdsByPassword(@RequestBody Map<String, String> body) {
        String inputPassword = body.get("password");
        List<String> foundIds = userService.findIdsByPassword(inputPassword);

        if (!foundIds.isEmpty()) {
            return ResponseEntity.ok(Map.of("ids", foundIds));
        } else {
            return ResponseEntity.status(404).body("ID NOT FOUND");
        }
    }

    // 비밀번호 찾기
    @PostMapping("/find-pw")
    public ResponseEntity<?> findPw(@RequestBody Map<String, String> body) {
        String userid = body.get("userid");
        String tempPw = userService.updateToTempPassword(userid);

        if (tempPw == null) {
            return ResponseEntity.status(404).body("ID not found");
        } else {
            return ResponseEntity.ok(Map.of("pw", tempPw));
        }
    }

    // 회원정보 수정하기
    @PostMapping("/modify-profile")
    public ResponseEntity<?> modifyProfile(@RequestBody UserDTO userDto) {
        boolean result = userService.modifyUser(userDto);
        if (result) {
            return ResponseEntity.ok("수정 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패");
        }
    }
}