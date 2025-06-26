package com.mini2.project_back.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

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

    @Column(name = "FREE_COMMENT_DATE", insertable = false, updatable = false)
    private LocalDate date;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<Recomment> getRecomments() {
        return recomments;
    }

    public void setRecomments(List<Recomment> recomments) {
        this.recomments = recomments;
    }
}