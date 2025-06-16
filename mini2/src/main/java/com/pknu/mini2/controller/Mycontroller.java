package com.pknu.mini2.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class Mycontroller {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String userid = body.get("userid");
        String password = body.get("password");

        String url = "jdbc:oracle:thin:@210.119.14.67:1521:XE";
        String dbUser = "project2";
        String dbPassword = "12345";

        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPassword);
                PreparedStatement stmt = conn.prepareStatement(
                        "SELECT PASSWORD FROM USER_INFO WHERE ID = ?")) {

            stmt.setString(1, userid);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                String hashedPassword = rs.getString("PASSWORD");
                if (passwordEncoder.matches(password, hashedPassword)) {
                    return ResponseEntity.ok("SUCCESS");
                } else {
                    return ResponseEntity.status(401).body("FAIL");
                }
            } else {
                return ResponseEntity.status(401).body("FAIL");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("DB ERROR");
        }
    }

    @PostMapping("/juso")
    public @ResponseBody String dfd(String roadFullAddr) {
        System.out.println("테스트:" + roadFullAddr);
        return "ok";

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String userid = body.get("userid");
        String password = body.get("password");
        String username = body.get("username");

        String url = "jdbc:oracle:thin:@210.119.14.67:1521:XE";
        String dbUser = "project2";
        String dbPassword = "12345";

        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPassword);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO USER_INFO (ID, PASSWORD, NAME) VALUES (?, ?, ?)")) {

            String hashedPassword = passwordEncoder.encode(password);

            stmt.setString(1, userid);
            stmt.setString(2, hashedPassword);
            stmt.setString(3, username);

            int rowsInserted = stmt.executeUpdate();

            if (rowsInserted > 0) {
                return ResponseEntity.ok("SIGNUP SUCCESS");
            } else {
                return ResponseEntity.status(500).body("INSERT FAILED");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            if (e.getErrorCode() == 1) {
                return ResponseEntity.status(409).body("ID ALREADY EXISTS");
            }
            return ResponseEntity.status(500).body("DB ERROR");
        }
    }
}
