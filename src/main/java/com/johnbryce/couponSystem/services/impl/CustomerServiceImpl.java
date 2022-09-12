package com.johnbryce.couponSystem.services.impl;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.dto.CouponDto;
import com.johnbryce.couponSystem.dto.CustomerDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import com.johnbryce.couponSystem.mappers.CouponMapper;
import com.johnbryce.couponSystem.mappers.CustomerMapper;
import com.johnbryce.couponSystem.repos.CouponRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import com.johnbryce.couponSystem.security.Information;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;
    private final CouponMapper couponMapper;
    private final CustomerMapper customerMapper;
    private final TokenManager tokenManager;

    @Override
    public void register(String email, String password) throws CouponSystemException {

        if(customerRepository.existsByEmail(email)){
            throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
        }

        Customer customer = new Customer(email,password, ClientType.CUSTOMER);
        customerRepository.save(customer);
    }

    @Override
    public UUID login(String email, String password, ClientType clientType) throws CouponSystemException {
        if(!customerRepository.existsByEmailAndPassword(email,password)){
            throw new CouponSystemException(ErrMsg.EMAIL_OR_PASSWORD_INCORRECT);
        }
        Customer customer = customerRepository.findTop1ByEmail(email);
        int customerId = customer.getId();
        Information information = new Information(customerId,email,clientType);
        return tokenManager.addToken(information);
    }

    @Override
    public void logout() {

    }

    @Override
    public CouponDto addCouponPurchase(int userId, int couponId) throws CouponSystemException {
        CouponDto couponDto = couponMapper.toDto(couponRepository.findById(couponId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
        if (couponDto.getAmount() <= 0) {
            throw new CouponSystemException(ErrMsg.OUT_OF_COUPONS);
        }
        if ((couponMapper.toDao(couponDto).getEndDate()).before(Timestamp.valueOf(LocalDateTime.now()))) {
            throw new CouponSystemException(ErrMsg.COUPON_EXPIRED);
        }
        if(couponRepository.existsInPurchasedCouponsForCustomer(couponId, userId)) { // Check if customer already owns one
            throw new CouponSystemException(ErrMsg.COUPON_ALREADY_OWNED);
        }
        customerRepository.buyCoupon(userId, couponId);
        couponDto.setAmount(couponDto.getAmount() - 1);
        Coupon coupon = couponMapper.toDao(couponDto);
        return couponMapper.toDto(couponRepository.saveAndFlush(coupon));
    }

    @Override
    public void deleteCouponPurchase(int userId, int couponId) throws CouponSystemException {
        if (!couponRepository.existsInPurchasedCouponsForCustomer(couponId, userId)) {
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        couponRepository.deleteCouponPurchase(couponId);
    }

    @Override
    public List<CouponDto> getCustomerCoupons(int userId) throws CouponSystemException {
        customerRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        List<Coupon> coupons = new ArrayList<>();
        for (Integer integer : couponRepository.getCustomerCouponsIds(userId)) {
            coupons.add(couponRepository.findById(integer).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
        }
        return couponMapper.toDtoList(coupons);
    }

    @Override
    public CouponDto getSingleCustomerCoupon(int userId, int couponId) throws CouponSystemException {
        if (!couponRepository.existsInPurchasedCouponsForCustomer(couponId, userId)) {
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        return couponMapper.toDto(couponRepository.findCouponById(couponId));
    }

    @Override
    public List<CouponDto> getCustomerCouponsByCategory(int userId, Category category) throws CouponSystemException {
        if (!customerRepository.existsById(userId)){
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        List<Coupon> coupons = new ArrayList<>();
        for (Integer integer : couponRepository.getCustomerCouponsIds(userId)) {
            coupons.add(couponRepository.findByIdAndCategory(integer, category));
        }
        return couponMapper.toDtoList(coupons);
    }

    @Override
    public List<CouponDto> getCustomerCouponsByPrice(int userId, double maxPrice) throws CouponSystemException {
        if (!customerRepository.existsById(userId)){
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        List<Coupon> coupons = new ArrayList<Coupon>();
        for (Coupon coupon : customerRepository.getById(userId).getCoupons()) {
            if (coupon.getPrice() <= maxPrice) {
                coupons.add(coupon);
            }
        }
        return couponMapper.toDtoList(coupons);
    }

    @Override
    public CustomerDto getOneCustomer(int userId) throws CouponSystemException {
        return customerMapper.toDto(customerRepository.findById(userId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
    }
}
