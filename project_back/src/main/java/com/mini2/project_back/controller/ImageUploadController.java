package com.mini2.project_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
public class ImageUploadController {

    // react 에서 이미지 업로드 요청이 되면 처리하는 api
    @PostMapping("/api/upload-image")
    /* React에서 보낸 이미지 파일을 받아 서버에 저장, url 문자열로 응답 */
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {

        /* 1. 업로드 할 디렉토리 경로를 설정 */
        String uploadDir = System.getProperty("user.dir") + "/uploads"; // System.getProperty("user.div")는 현재 프로젝트 폴더의
                                                                        // 경로
        /* 2. Path객체로 변환 (java.nio.file 사용) */
        Path uploadPath = Paths.get(uploadDir);
        /* 3. Upload 폴더가 실제로 존재하지 않으면 새로 만듬 */
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath); // 없는 디렉토리 생성
        }
        /* 4. 실제 저장할 파일명을 생성 */
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        /* 5. 저장할 위치(파일 경로)를 완성 */
        Path path = uploadPath.resolve(filename);
        /* 6. 사용자가 업로드한 파일 내용을 실제로 upload 폴더에 저장 */
        Files.copy(file.getInputStream(), path);

        /*
         * 7. 저장된 이미지에 접근할 수 있는 url 반환
         * <img scr ="..."> 형태로 React 에디터라 사용
         */
        return ResponseEntity.ok("/uploads/" + filename);
    }
}
