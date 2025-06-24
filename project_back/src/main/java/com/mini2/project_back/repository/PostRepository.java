package com.mini2.project_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mini2.project_back.domain.Post;

// JpaRepository<엔티티 클래스, ID의 타입>을 상속받으면 save(), findAll(), findById(), deleteById() 등 DB 관련 기능을 자동으로 쓸 수 있게 됨
public interface PostRepository extends JpaRepository<Post, Long> {
    // 아무 메서드 없어도 기본적인 CRUD 동작 가능
    @Query("SELECT p FROM Post p ORDER BY p.date DESC")
    List<Post> findAllOrderByDateDesc();
}
