package com.mini2.project_back.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "FREE_LIKE")
public class FreeLike {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_LIKE")
    @SequenceGenerator(name = "SEQ_FREE_LIKE", sequenceName = "SEQ_FREE_LIKE", allocationSize = 1)
    @Column(name = "FREE_LIKE_INDEX")
    private Long freeLikeIndex;

    @Column(name = "FREE_INDEX", nullable = false)
    private Long freeIndex; // FREE_BOARD의 FREE_INDEX

    @Column(name = "ID", nullable = false)
    private String id; // USER_INFO 외래키 (사용자 ID)

    @Column(name = "FREE_LIKE_TOGGLE", nullable = false)
    private int freeLikeToggle;

    // Getter, Setter
    public Long getFreeLikeIndex() {
        return freeLikeIndex;
    }

    public Long getFreeIndex() {
        return freeIndex;
    }

    public void setFreeIndex(Long freeIndex) {
        this.freeIndex = freeIndex;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getFreeLikeToggle() {
        return freeLikeToggle;
    }

    public void setFreeLikeToggle(int freeLikeToggle) {
        this.freeLikeToggle = freeLikeToggle;
    }
}