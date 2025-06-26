package com.mini2.project_back.dto;

public class TopLikeDTO {
    private Long id; // FREE_INDEX
    private String title;
    private String author;
    private int viewer;
    private long likeCount; // 집계된 좋아요 수

    public TopLikeDTO(Long id, String title, String author, int viewer, long likeCount) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.viewer = viewer;
        this.likeCount = likeCount;
    }

    // Getter
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public int getViewer() {
        return viewer;
    }

    public long getLikeCount() {
        return likeCount;
    }
}