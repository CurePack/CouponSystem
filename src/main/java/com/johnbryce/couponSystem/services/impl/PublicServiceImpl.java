package com.johnbryce.couponSystem.services.impl;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.mappers.CouponMapper;
import com.johnbryce.couponSystem.repos.CouponRepository;
import com.johnbryce.couponSystem.services.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicServiceImpl implements PublicService {
    public final CouponRepository couponRepository;
    public final CouponMapper couponMapper;

    @Override
    public List<CouponDto> getAllCoupons() throws CouponSystemException {
        return couponMapper.toDtoList(couponRepository.findAll());
    }

    @Override
    public List<CouponDto> getCouponsByCategory(Category category) throws CouponSystemException {
        return couponMapper.toDtoList(couponRepository.findByCategory(category));
    }

    @Override
    public List<CouponDto> getCouponsUpToPrice(double maxPrice) throws CouponSystemException {
        return couponMapper.toDtoList(couponRepository.getAllByPrice(maxPrice));
    }
}
