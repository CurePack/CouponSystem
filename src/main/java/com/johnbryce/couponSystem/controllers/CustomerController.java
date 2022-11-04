package com.johnbryce.couponSystem.controllers;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.dto.*;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@RestController
@RequestMapping("api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {
    private final CustomerService customerService;
    private final TokenManager tokenManager;


    @GetMapping("/coupons")
    public List<CouponDto> getAllCustomerCoupons(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return customerService.getCustomerCoupons(userId);
    }

    @GetMapping("/coupon/{id}")
    public CouponDto getSingleCustomerCoupon(@PathVariable int id,@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return customerService.getSingleCustomerCoupon(userId, id);
    }

    @GetMapping("/coupons/{category}")
    public List<CouponDto> getCustomerCouponsByCategory(@PathVariable String category, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return customerService.getCustomerCouponsByCategory(userId, Category.valueOf(category.toUpperCase(Locale.ROOT)));
    }

    @GetMapping("/coupons/uptoprice/{maxPrice}")
    public List<CouponDto> getCustomerCouponsByPrice(@PathVariable String maxPrice, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return customerService.getCustomerCouponsByPrice(userId, Double.parseDouble(maxPrice));
    }

    @PostMapping("/coupons/purchase/{couponId}")
    public CouponDto purchaseCoupon(@PathVariable int couponId, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        return customerService.addCouponPurchase(userId, couponId);
    }

    @DeleteMapping("/coupons/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCouponPurchase(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        int userId = tokenManager.getUserID(token);
        customerService.deleteCouponPurchase(userId, id);
    }












    //    @PostMapping("register")
//    @ResponseStatus(HttpStatus.CREATED)
//    public void register(@RequestBody RegisterReqDto registerReqDto) throws CouponSystemException {
//        String email = registerReqDto.getEmail();
//        String password = registerReqDto.getPassword();
//        customerService.register(email, password);
//    }
//
//    @PostMapping("login")
//    @ResponseStatus(HttpStatus.CREATED)
//    public LoginResDto login(@RequestBody LoginReqDto loginReqDto) throws CouponSystemException {
//        String email = loginReqDto.getEmail();
//        String password = loginReqDto.getPassword();
//        UUID uuid = customerService.login(email, password);
//        ClientType clientType = tokenManager.getClientType(uuid);
//        return new LoginResDto(email, uuid, clientType);
//    }
}
