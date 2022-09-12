package com.johnbryce.couponSystem.services.impl;


import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;

import com.johnbryce.couponSystem.beans.Coupon;

import com.johnbryce.couponSystem.dto.CompanyDto;
import com.johnbryce.couponSystem.dto.CouponDto;

import com.johnbryce.couponSystem.exceptions.CouponSystemException;

import com.johnbryce.couponSystem.exceptions.ErrMsg;

import com.johnbryce.couponSystem.exceptions.ExceptionUtils;

import com.johnbryce.couponSystem.mappers.CompanyMapper;
import com.johnbryce.couponSystem.mappers.CouponMapper;

import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CouponRepository;

import com.johnbryce.couponSystem.security.Information;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.CompanyService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Scope;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CouponRepository couponRepository;
    private final CouponMapper couponMapper;
    private final CompanyMapper companyMapper;
    private final TokenManager tokenManager;

    @Override
    public void register(String email, String password) throws CouponSystemException {

        if(companyRepository.existsByEmail(email)){
            throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
        }

        Company company = new Company(email,password, ClientType.COMPANY);
        companyRepository.save(company);
    }

    @Override
    public UUID login(String email, String password, ClientType clientType) throws CouponSystemException {
        if(!companyRepository.existsByEmailAndPassword(email,password)){
            throw new CouponSystemException(ErrMsg.EMAIL_OR_PASSWORD_INCORRECT);
        }
        Company company = companyRepository.findTop1ByEmail(email);
        int companyId = company.getId();
        Information information = new Information(companyId,email,clientType);
        return tokenManager.addToken(information);
    }

    @Override
    public void logout() {

    }


    @Override
    public CouponDto addCoupon(int userId, CouponDto couponDto) throws CouponSystemException {
        if (couponRepository.existsByTitle(couponDto.getTitle())) {
            throw new CouponSystemException(ErrMsg.TITLE_EXIST);
        }
        couponDto.setCompany(companyMapper.toDao(getOneCompany(userId)));
        Coupon coupon = couponMapper.toDao(couponDto);
        Company company = companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        coupon.setCompany(company);

        return couponMapper.toDto(couponRepository.save(coupon));
    }

    @Override
    public CouponDto updateCoupon(int userId, int couponId, CouponDto couponDto) throws CouponSystemException {
        if (!couponRepository.existsById(couponId)){
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        Company company = companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        if (!couponRepository.existsByIdAndCompany(couponId, company)) {
            throw new CouponSystemException(ErrMsg.USER_ID_NOT_MATCH_TASK);
        }

        couponDto.setId(couponId);
        Coupon coupon = couponMapper.toDao(couponDto);
        coupon.setCompany(company);
        return couponMapper.toDto(couponRepository.saveAndFlush(coupon));
    }

    @Override
    public void deleteCouponById(int userId, int couponId) throws CouponSystemException {
        if (!couponRepository.existsById(couponId) && !couponRepository.existsInPurchasedCoupons(couponId)) {
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        Company company = companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        if (!couponRepository.existsByIdAndCompany(couponId, company)) {
            throw new CouponSystemException(ErrMsg.USER_ID_NOT_MATCH_TASK);
        }
        couponRepository.deleteCouponPurchase(couponId);
        couponRepository.deleteById(couponId);
    }

    @Override
    public CouponDto getSingleCoupon(int userId, int couponId) throws CouponSystemException {
        Coupon coupon = couponRepository.findById(couponId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));

        Company company = companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        if (!couponRepository.existsByIdAndCompany(couponId, company)) {
            throw new CouponSystemException(ErrMsg.USER_ID_NOT_MATCH_TASK);
        }
        coupon.setCompany(company);
        return couponMapper.toDto(coupon);
    }

    @Override
    public List<CouponDto> getAllCompanyCoupon(int userId) throws CouponSystemException {
        Company company = companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        return couponMapper.toDtoList(couponRepository.findAllByCompany(company));
    }

    @Override
    public List<CouponDto> getCompanyCouponsByCategory(int userId, Category category) throws CouponSystemException {
        if (!couponRepository.existsById(userId)){
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        return couponMapper.toDtoList(couponRepository.getCompanyCouponsByCategory(userId, category.toString()));
    }


    @Override
    public List<CouponDto> getCompanyCouponsByPrice(int userId, double maxPrice) throws CouponSystemException {
        if (!companyRepository.existsById(userId)) {
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        List<Coupon> arr = new ArrayList<Coupon>();
        for (Coupon coupon : companyRepository.getById(userId).getCoupons()) {
            if (coupon.getPrice() <= maxPrice) {
                arr.add(coupon);
            }
        }
        return couponMapper.toDtoList(arr);
    }

    @Override
    public CompanyDto getOneCompany(int userId) throws CouponSystemException {
        return companyMapper.toDto(companyRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
    }
}
