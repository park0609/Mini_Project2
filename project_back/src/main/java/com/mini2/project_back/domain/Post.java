package com.mini2.project_back.domain;

import jakarta.persistence.*; // JPA 어노테이션 사용

@Entity // JPA 엔티티(테이블과 매핑됨)
@Table(name = "posts") // 매핑할 테이블 이름 (자동 생성 가능)
public class Post {
    @Id // 기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String date;

    public Post() {
    } // 기본 생성자

    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // Getter / Setter
    public Long getID() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
