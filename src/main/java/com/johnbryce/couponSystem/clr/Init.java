package com.johnbryce.couponSystem.clr;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.mappers.CouponMapper;
import com.johnbryce.couponSystem.services.CompanyService;
import com.johnbryce.couponSystem.services.CustomerService;
import com.johnbryce.couponSystem.utils.CouponExpirationDailyJob;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@Order(3)
@RequiredArgsConstructor
public class Init implements CommandLineRunner {

    private static final String URL = "http://localhost:8080/api/coupons";
    private final CouponMapper couponMapper;
    private final CompanyService companyService;
    private final CustomerService customerService;

    @Override
    public void run(String... args) throws Exception {

    }
}
