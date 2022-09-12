package com.johnbryce.couponSystem.services;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;

import java.util.List;

public interface PublicService {
    List<CouponDto> getAllCoupons() throws CouponSystemException;
    List<CouponDto> getCouponsByCategory(Category category) throws CouponSystemException;
    List<CouponDto> getCouponsUpToPrice(double maxPrice) throws CouponSystemException;
}
