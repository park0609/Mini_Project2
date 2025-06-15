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

@RestController
public class Mycontroller {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        String url = "jdbc:oracle:thin:@210.119.14.67:1521:XE";
        String dbUser = "project2";
        String dbPassword = "12345";

        boolean loginSuccess = false;

        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPassword);
                PreparedStatement stmt = conn.prepareStatement(
                        "SELECT * FROM USER_INFO WHERE ID = ? AND PASSWORD = ?")) {

            stmt.setString(1, username);
            stmt.setString(2, password);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                loginSuccess = true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("DB ERROR");
        }

        if (loginSuccess) {
            return ResponseEntity.ok("SUCCESS");
        } else {
            return ResponseEntity.status(401).body("FAIL");
        }
    }
}
