package com.mini2.project_back.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "FREE_RE_COMMENT")
public class Recomment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_RECOMMENT_INDEX")
    @SequenceGenerator(name = "SEQ_FREE_RECOMMENT_INDEX", sequenceName = "SEQ_FREE_RECOMMENT_INDEX", allocationSize = 1)
    @Column(name = "FREE_RECOMMENT_INDEX")
    private Long id;

    @Column(name = "FREE_COMMENT_INDEX", nullable = false)
    private Long commentId;

    @Column(name = "ID")
    private String authorId;

    @Column(name = "FREE_RECOMMENT_AUTHOR", nullable = false)
    private String author;

    @Column(name = "FREE_RECOMMENT", nullable = false)
    private String content;

    @CreationTimestamp
    @JsonProperty(access = Access.READ_ONLY)
    @Column(name = "FREE_RECOMMENT_DATE", nullable = false, updatable = false)
    private LocalDateTime date;

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
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

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}