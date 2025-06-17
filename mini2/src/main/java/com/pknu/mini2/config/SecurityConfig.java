package com.pknu.mini2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 비활성화 (API 개발용)
                .authorizeHttpRequests()
                .anyRequest().permitAll(); // 모든 요청 허용 (기본 로그인 창 차단)
        return http.build();
    }
}
