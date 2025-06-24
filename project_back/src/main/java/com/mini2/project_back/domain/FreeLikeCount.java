package com.mini2.project_back.domain;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
@Table(name = "FREE_LIKE")
public class FreeLikeCount {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FREE_LIKE_INDEX")
    @SequenceGenerator(name = "SEQ_FREE_LIKE_INDEX", sequenceName = "SEQ_FREE_LIKE_INDEX", allocationSize = 1)
    @Column(name = "FREE_LIKE_INDEX")
    private Long like_id;

    @Column(name = "FREE_INDEX")
    private Long freeIndex;

    @Column(name = "ID")
    private String id;

    @Column(name = "FREE_LIKE_TOGGLE")
    private Integer toggle = 0; // 기본적으로 0으로 좋아요가 되지 않음

    // 좋아요 getter/setter

    public Long getLike_id() {
        return like_id;
    }

    public Long getTable_index() {
        return freeIndex;
    }

    public void setTable_index(Long freeIndex) {
        this.freeIndex = freeIndex;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getToggle() {
        return toggle;
    }

    public void setToggle(Integer toggle) {
        this.toggle = toggle;
    }
}
