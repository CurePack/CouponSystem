package com.johnbryce.couponSystem.utils;

import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.repos.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

@Component
public class CouponExpirationDailyJob {

    @Autowired
    private CouponRepository couponRepository;

    @Scheduled(fixedRate = 1000)
    public void run() {
        //System.out.println("CEDJob is running!");
        ArrayList<Coupon> arr = (ArrayList<Coupon>) couponRepository.findAll();
        for (Coupon coupon : arr) {
            if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))) {
                couponRepository.delete(coupon);
                couponRepository.deleteCouponPurchase(coupon.getId());
                System.out.println("CEDJob just deleted an expired coupon (" + coupon.getTitle() + ")!");
            }
        }
    }
}
