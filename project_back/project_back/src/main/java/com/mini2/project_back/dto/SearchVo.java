package com.mini2.project_back.dto;

public class SearchVo {
    private int page = 1;
    private int size = 10;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getStartRow() {
        return (page - 1) * size + 1;
    }

    public int getEndRow() {
        return page * size;
    }
}
