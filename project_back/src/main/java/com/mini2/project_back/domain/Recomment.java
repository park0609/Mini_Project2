package com.mini2.project_back.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

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

    @Column(name = "FREE_RECOMMENT_DATE", insertable = false, updatable = false)
    private LocalDate date;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}