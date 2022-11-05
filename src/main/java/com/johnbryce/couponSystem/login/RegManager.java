package com.johnbryce.couponSystem.login;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

@RequiredArgsConstructor
@CrossOrigin
@Component
public class RegManager {

    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;

    public void register(String email, String password, ClientType clientType) throws CouponSystemException {
        switch (clientType) {
            case COMPANY:
                if(companyRepository.existsByEmail(email)){
                    throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
                }
                Company company = new Company(email, password, ClientType.COMPANY);
                companyRepository.save(company);
            case CUSTOMER:
                if(customerRepository.existsByEmail(email)){
                    throw new CouponSystemException(ErrMsg.EMAIL_EXIST);
                }
                Customer customer = new Customer(email, password, ClientType.CUSTOMER);
                customerRepository.save(customer);
        }
    }
}
