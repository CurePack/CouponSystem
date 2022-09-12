package com.johnbryce.couponSystem.services;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.dto.CompanyDto;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.mappers.CouponMapper;
import com.johnbryce.couponSystem.repos.CouponRepository;

import java.util.List;
import java.util.UUID;

public interface CompanyService {
   void register(String email,String password) throws CouponSystemException;
   UUID login(String email, String password, ClientType clientType) throws CouponSystemException;
   void logout();
   CouponDto addCoupon(int userId, CouponDto couponDto) throws CouponSystemException;
   CouponDto updateCoupon(int userId, int couponId, CouponDto couponDto) throws CouponSystemException;
   void deleteCouponById(int userId, int couponId) throws CouponSystemException;
   CouponDto getSingleCoupon(int userId, int couponId) throws CouponSystemException;
   List<CouponDto> getAllCompanyCoupon(int userId) throws CouponSystemException;
   public List<CouponDto> getCompanyCouponsByCategory(int userId, Category category) throws CouponSystemException;
   public List<CouponDto> getCompanyCouponsByPrice(int userId, double maxPrice) throws CouponSystemException;
   public CompanyDto getOneCompany(int userId) throws CouponSystemException;





}
