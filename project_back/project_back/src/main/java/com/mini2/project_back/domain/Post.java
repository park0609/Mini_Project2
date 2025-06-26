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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_INDEX")
    @SequenceGenerator(name = "SEQ_FREE_INDEX", sequenceName = "SEQ_FREE_INDEX", allocationSize = 1)
    @Column(name = "FREE_INDEX")
    private Long id;

    @Column(name = "ID")
    private String userid;

    @Column(name = "FREE_TITLE", nullable = false)
    private String title;

    @Column(name = "FREE_CONTENT", nullable = false)
    private String content;

    @Column(name = "FREE_DATE", insertable = false, updatable = false)
    private LocalDate date;

    @Column(name = "FREE_AUTHOR", nullable = false)
    private String author;

    @Column(name = "FREE_VIEWER", nullable = false)
    private Integer viewCount = 0;

    @Column(name = "FREE_LIKECOUNT", nullable = false)
    private Integer likeCount = 0;

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

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
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

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }
}
