package com.pknu.project_springboot.Controller;

import java.util.List;
import java.util.Map;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Mycontroller {

    private final JdbcTemplate jdbcTemplate;

    public Mycontroller(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @GetMapping("/data")
    public List<Map<String, Object>> getData() {
        String query = "SELECT * FROM quali_info";
        return jdbcTemplate.queryForList(query);
    }

    @GetMapping("/data2")
    public List<Map<String, Object>> GetData() {
        String qurey = "SELECT * FROM QUALI_INFO qi JOIN QUALI_TITLE qt ON qi.QUALI_NAME  = qt.QUALI_NAME";
        return jdbcTemplate.queryForList(qurey);
    }
}
