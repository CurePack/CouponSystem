package com.johnbryce.couponSystem.services.impl;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.dto.CompanyDto;
import com.johnbryce.couponSystem.dto.CustomerDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import com.johnbryce.couponSystem.exceptions.ExceptionUtils;
import com.johnbryce.couponSystem.mappers.CompanyMapper;
import com.johnbryce.couponSystem.mappers.CustomerMapper;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CouponRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import com.johnbryce.couponSystem.security.Information;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;
    private final CompanyMapper companyMapper;
    private final CustomerMapper customerMapper;
    private final TokenManager tokenManager;

    @Override
    public UUID login(String email, String password, ClientType clientType) throws CouponSystemException {
        if((!Objects.equals(email, "admin@admin.com")) || (!Objects.equals(password, "admin"))) {
            throw new CouponSystemException(ErrMsg.EMAIL_OR_PASSWORD_INCORRECT);
        }
        Information information = new Information(1,email,clientType);
        return tokenManager.addToken(information);
    }

    @Override
    public CompanyDto addCompany(CompanyDto companyDto) throws CouponSystemException {
        if (companyRepository.existsByEmail(companyDto.getEmail())) {
            throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
        }
        if (companyRepository.existsByName(companyDto.getName())) {
            throw new CouponSystemException(ErrMsg.NAME_EXIST);
        }
        if (companyDto.getClientType() == null) companyDto.setClientType(ClientType.COMPANY);
        if (companyDto.getPassword() == null) companyDto.setPassword("1234");
        return companyMapper.toDto(companyRepository.save(companyMapper.toDao(companyDto)));
    }

    @Override
    public CompanyDto updateCompany(int companyId, CompanyDto companyDto) throws CouponSystemException {
        companyRepository.findById(companyId).orElseThrow(() -> new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        companyDto.setId(companyId);
        return companyMapper.toDto(companyRepository.saveAndFlush(companyMapper.toDao(companyDto)));
    }

    @Override
    public void deleteCompanyById(int companyId) throws CouponSystemException {
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        for (Coupon coupon : company.getCoupons()) couponRepository.deleteCouponPurchase(coupon.getId());
        companyRepository.delete(company);
    }

    @Override
    public CompanyDto getSingleCompany(int companyId) throws CouponSystemException {
        return companyMapper.toDto(companyRepository.findById(companyId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
    }

    @Override
    public List<CompanyDto> getAllCompany() throws CouponSystemException {
        return companyMapper.toDtoList(companyRepository.findAll());
    }


    @Override
    public CustomerDto addCustomer(CustomerDto customerDto) throws CouponSystemException {
        if (customerRepository.existsByEmail(customerDto.getEmail())) {
            throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
        }
        if (customerDto.getClientType() == null) customerDto.setClientType(ClientType.CUSTOMER);
        if (customerDto.getPassword() == null) customerDto.setPassword("1234");
        return customerMapper.toDto(customerRepository.save(customerMapper.toDao(customerDto)));
    }

    @Override
    public CustomerDto updateCustomer(int customerId, CustomerDto customerDto) throws CouponSystemException {
        customerRepository.findById(customerId).orElseThrow(() -> new CouponSystemException(ErrMsg.ID_NOT_EXIST));
        customerDto.setId(customerId);
        return customerMapper.toDto(customerRepository.saveAndFlush(customerMapper.toDao(customerDto)));
    }

    @Override
    public void deleteCustomerById(int customerId) throws CouponSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new CouponSystemException(ErrMsg.ID_NOT_EXIST);
        }
        couponRepository.deleteCustomerCoupons(customerId);
        customerRepository.deleteById(customerId);
    }

    @Override
    public CustomerDto getSingleCustomer(int customerId) throws CouponSystemException {
        return customerMapper.toDto(customerRepository.findById(customerId).orElseThrow(()->new CouponSystemException(ErrMsg.ID_NOT_EXIST)));
    }

    @Override
    public List<CustomerDto> getAllCustomer() throws CouponSystemException {
        return customerMapper.toDtoList(customerRepository.findAll());
    }

    @Override
    public int count() {
        return (int) couponRepository.count();
    }
}
