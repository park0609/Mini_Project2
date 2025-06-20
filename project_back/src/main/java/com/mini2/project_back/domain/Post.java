package com.mini2.project_back.domain;

import java.time.LocalDate;
// import java.time.LocalDateTime;

// JPA 어노테이션 사용
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "FREE_BOARD")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "free_board_seq")
    @SequenceGenerator(name = "free_board_seq", sequenceName = "FREE_BOARD_SEQ", allocationSize = 1)
    @Column(name = "FREE_INDEX")
    private Long id;

    @Column(name = "FREE_TITLE", nullable = false)
    private String title;

    @Column(name = "FREE_CONTENT", nullable = false)
    private String content;

    @Column(name = "FREE_DATE", insertable = false, updatable = false)
    private LocalDate date;

    @Column(name = "FREE_AUTHOR", nullable = false)
    private String author;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
