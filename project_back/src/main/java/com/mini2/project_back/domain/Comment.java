package com.mini2.project_back.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "FREE_COMMENT")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_COMMENT_INDEX")
    @SequenceGenerator(name = "SEQ_FREE_COMMENT_INDEX", sequenceName = "SEQ_FREE_COMMENT_INDEX", allocationSize = 1)
    @Column(name = "FREE_COMMENT_INDEX")
    private Long id;

    @Column(name = "FREE_INDEX", nullable = false)
    private Long postId;

    @Column(name = "FREE_COMMENT_AUTHOR", nullable = false)
    private String author;

    @Column(name = "FREE_COMMENT", nullable = false)
    private String content;

    @Column(name = "FREE_COMMENT_DATE", insertable = false, updatable = false)
    private LocalDateTime date;

    // Getter / Setter
    public Long getId() {
        return id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }
}