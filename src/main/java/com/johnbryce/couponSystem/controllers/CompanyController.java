package com.johnbryce.couponSystem.controllers;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("api/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" /*,allowedHeaders = "*"*/)
public class CompanyController {

    private final CompanyService companyService;
    private final TokenManager tokenManager;



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CouponDto addCoupon(@RequestBody CouponDto couponDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.addCoupon(userId, couponDto);
    }

    @PutMapping("/{id}")
    public CouponDto updateCoupon(@PathVariable int id, @RequestBody CouponDto couponDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.updateCoupon(userId, id, couponDto);
    }

    @DeleteMapping("/coupons/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        companyService.deleteCouponById(userId, id);
    }

    @GetMapping("/coupons/{id}")
    public CouponDto getSingleCoupon(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.getSingleCoupon(userId, id);
    }

    @GetMapping("/coupons")
    public List<CouponDto> getAllCompanyCoupons(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.getAllCompanyCoupon(userId);
    }

    @GetMapping("/coupons/category")
    public List<CouponDto> getCompanyCouponsByCategory(@RequestParam Category category, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.getCompanyCouponsByCategory(userId, category);
    }

    @GetMapping("/coupons/price/max")
    public List<CouponDto> getCompanyCouponsByPrice(@RequestParam double price, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return companyService.getCompanyCouponsByPrice(userId, price);
    }
}
