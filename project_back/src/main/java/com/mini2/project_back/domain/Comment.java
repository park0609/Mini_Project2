package com.mini2.project_back.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @Column(name = "ID")
    private String authorId;

    @Column(name = "FREE_COMMENT_AUTHOR", nullable = false)
    private String author;

    @Column(name = "FREE_COMMENT", nullable = false)
    private String content;

    @CreationTimestamp
    @JsonProperty(access = Access.READ_ONLY)
    @Column(name = "FREE_COMMENT_DATE", nullable = false, updatable = false)
    private LocalDateTime date;

    @OneToMany(mappedBy = "commentId", fetch = FetchType.LAZY)
    private List<Recomment> recomments;

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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

    public List<Recomment> getRecomments() {
        return recomments;
    }

    public void setRecomments(List<Recomment> recomments) {
        this.recomments = recomments;
    }
}