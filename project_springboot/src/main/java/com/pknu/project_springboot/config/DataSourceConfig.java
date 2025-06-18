package com.pknu.project_springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:oracle:thin:@//210.119.14.67:1521/XE?oracle.jdbc.timezoneAsRegion=false")
                .username("project2")
                .password("12345")
                .driverClassName("oracle.jdbc.OracleDriver")
                .build();
    }
}