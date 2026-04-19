//package com.verikyc.backend;
//
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.DynamicPropertyRegistry;
//import org.springframework.test.context.DynamicPropertySource;
//import org.testcontainers.containers.PostgreSQLContainer;
//import org.testcontainers.junit.jupiter.Container;
//import org.testcontainers.junit.jupiter.Testcontainers;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@AutoConfigureMockMvc
//@Testcontainers
//public abstract class AbstractIntegrationTest {
//
//    @Container
//    static final PostgreSQLContainer<?> POSTGRES =
//            new PostgreSQLContainer<>("postgres:15-alpine")
//                    .withDatabaseName("verikyc_test")
//                    .withUsername("test")
//                    .withPassword("test");
//
//    @DynamicPropertySource
//    static void overrideProperties(DynamicPropertyRegistry registry) {
//        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
//        registry.add("spring.datasource.username", POSTGRES::getUsername);
//        registry.add("spring.datasource.password", POSTGRES::getPassword);
//    }
//}