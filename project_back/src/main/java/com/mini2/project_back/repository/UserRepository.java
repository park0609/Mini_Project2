package com.mini2.project_back.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.mini2.project_back.dto.UserDTO;

@Repository
public class UserRepository {

    @Autowired
    private DataSource dataSource;

    // 로그인
    public String loginDB(String userid) throws SQLException {
        try (Connection conn = dataSource.getConnection();
                PreparedStatement stmt = conn.prepareStatement("SELECT PASSWORD FROM USER_INFO WHERE ID = ?")) {
            stmt.setString(1, userid);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                System.out.println("userid: " + "DB SELECT성공");
                return rs.getString("PASSWORD");
            }
            return null;
        }
    }

    // 회원가입
    public int insertUser(UserDTO user) throws SQLException {
        try (Connection conn = dataSource.getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO USER_INFO (ID, PASSWORD, NAME, PHONE, EMAIL, ADDRESS) VALUES (?, ?, ?, ?, ?, ?)")) {
            stmt.setString(1, user.getUserid());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getUsername());
            stmt.setString(4, user.getPhone());
            stmt.setString(5, user.getEmail());
            stmt.setString(6, user.getAddress());

            return stmt.executeUpdate();
        }
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 아이디 찾기
    public List<String> findIdsByPassword(String inputPassword, PasswordEncoder encoder) {
        String sql = "SELECT ID, PASSWORD FROM USER_INFO";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        List<String> matchedIds = new ArrayList<>();

        for (Map<String, Object> row : results) {
            String id = (String) row.get("ID");
            String hashedPw = (String) row.get("PASSWORD");

            if (encoder.matches(inputPassword, hashedPw)) {
                matchedIds.add(id);
            }
        }

        return matchedIds;
    }

    // 비밀번호 찾기
    public boolean existsById(String userid) {
        String sql = "SELECT COUNT(*) FROM USER_INFO WHERE ID = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userid);
        return count != null && count > 0;
    }

    // 비밀번호 찾기 후 변경
    public void updatePassword(String userid, String hashedPassword) {
        String sql = "UPDATE USER_INFO SET PASSWORD = ? WHERE ID = ?";
        jdbcTemplate.update(sql, hashedPassword, userid);
    }

    // 쿠키 찾기
    public UserDTO findById(String userId) {
        try (Connection conn = dataSource.getConnection();
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT ID, NAME, PHONE, EMAIL, ADDRESS FROM USER_INFO WHERE ID = ?")) {
            stmt.setString(1, userId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                UserDTO user = new UserDTO();
                user.setUserid(rs.getString("ID"));
                user.setUsername(rs.getString("NAME"));
                user.setPhone(rs.getString("PHONE"));
                user.setEmail(rs.getString("EMAIL"));
                user.setAddress(rs.getString("ADDRESS"));
                System.out.println(user);
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
