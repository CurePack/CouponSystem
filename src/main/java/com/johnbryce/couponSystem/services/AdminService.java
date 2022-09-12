package com.johnbryce.couponSystem.services;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.dto.CompanyDto;
import com.johnbryce.couponSystem.dto.CustomerDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;

import java.util.List;
import java.util.UUID;

public interface AdminService {

    UUID login(String email, String password, ClientType clientType) throws CouponSystemException;

    CompanyDto addCompany(CompanyDto companyDto) throws CouponSystemException;
    CompanyDto updateCompany(int companyId, CompanyDto companyDto) throws CouponSystemException;
    void deleteCompanyById(int companyId) throws CouponSystemException;
    CompanyDto getSingleCompany(int companyId) throws CouponSystemException;
    List<CompanyDto> getAllCompany() throws CouponSystemException;

    CustomerDto addCustomer(CustomerDto customerDto) throws CouponSystemException;
    CustomerDto updateCustomer(int customerId, CustomerDto customerDto) throws CouponSystemException;
    void deleteCustomerById(int customerId) throws CouponSystemException;
    CustomerDto getSingleCustomer(int customerId) throws CouponSystemException;
    List<CustomerDto> getAllCustomer() throws CouponSystemException;

    int count();


}
