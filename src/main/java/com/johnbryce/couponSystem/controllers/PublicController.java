package com.johnbryce.couponSystem.controllers;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.services.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PublicController {

    private final PublicService publicService;

    @GetMapping()
    public List<CouponDto> getAllCoupons() throws CouponSystemException {
        return publicService.getAllCoupons();
    }

    @GetMapping("/{category}")
    public List<CouponDto> getCouponsByCategory(@PathVariable String category) throws CouponSystemException {
        Category newCategory = Category.valueOf(category.toUpperCase(Locale.ROOT));
        return publicService.getCouponsByCategory(newCategory);
    }

    @GetMapping("/uptoprice/{maxPrice}")
    public List<CouponDto> getCouponsByMaxPrice(@PathVariable String maxPrice) throws CouponSystemException {
        double newMaxPrice = Double.parseDouble(maxPrice);
        return publicService.getCouponsUpToPrice(newMaxPrice);
    }
}
