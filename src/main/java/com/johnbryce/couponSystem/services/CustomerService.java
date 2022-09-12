package com.johnbryce.couponSystem.services;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.dto.CustomerDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;

import java.util.List;
import java.util.UUID;

public interface CustomerService {

    void register(String email, String password) throws CouponSystemException;
    UUID login(String email, String password, ClientType clientType) throws CouponSystemException;
    void logout();
    CouponDto addCouponPurchase(int userId, int couponId) throws CouponSystemException;
    void deleteCouponPurchase(int userId, int couponId) throws CouponSystemException;
    public List<CouponDto> getCustomerCoupons(int userId) throws CouponSystemException;
    public CouponDto getSingleCustomerCoupon(int userId, int couponId) throws CouponSystemException;
    public List<CouponDto> getCustomerCouponsByCategory(int userId, Category category) throws CouponSystemException;
    public List<CouponDto> getCustomerCouponsByPrice(int userId, double maxPrice) throws CouponSystemException;
    public CustomerDto getOneCustomer(int userId) throws CouponSystemException;
}
