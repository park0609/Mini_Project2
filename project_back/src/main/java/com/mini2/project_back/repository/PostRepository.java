package com.mini2.project_back.repository;

import java.util.List;

import com.mini2.project_back.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// JpaRepository<엔티티 클래스, ID의 타입>을 상속받으면 save(), findAll(), findById(), deleteById() 등 DB 관련 기능을 자동으로 쓸 수 있게 됨
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT * FROM (" +
            " SELECT inner_query.*, ROWNUM rn FROM (" +
            "   SELECT * FROM free_board ORDER BY free_index DESC" +
            " ) inner_query WHERE ROWNUM <= :endRow" +
            ") WHERE rn >= :startRow", nativeQuery = true)
    List<Post> findPagedPosts(@Param("startRow") int startRow,
            @Param("endRow") int endRow);

    @Query(value = "SELECT COUNT(*) FROM free_board", nativeQuery = true)
    int countTotalPosts();
}