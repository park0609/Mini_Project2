package com.mini2.project_back.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "FREE_BOARD")
public class FreeBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_BOARD")
    @SequenceGenerator(name = "SEQ_FREE_BOARD", sequenceName = "SEQ_FREE_BOARD", allocationSize = 1)
    @Column(name = "FREE_INDEX")
    private Long id;

    @Column(name = "ID", nullable = false)
    private String authorId; // USER_INFO 외래키

    @Column(name = "FREE_AUTHOR", nullable = false)
    private String author;

    @Column(name = "FREE_TITLE", nullable = false)
    private String title;

    @Column(name = "FREE_CONTENT", nullable = false)
    private String content;

    @Column(name = "FREE_DATE", insertable = false, updatable = false)
    private LocalDate freeDate;

    @Column(name = "FREE_VIEWER")
    private int viewer;

    @Column(name = "FREE_LIKECOUNT")
    private int likeCount;

    // Getter, Setter
    public Long getId() {
        return id;
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

    public LocalDate getFreeDate() {
        return freeDate;
    }

    public int getViewer() {
        return viewer;
    }

    public void setViewer(int viewer) {
        this.viewer = viewer;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}