package com.johnbryce.couponSystem.login;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.dto.LoginResDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import com.johnbryce.couponSystem.services.AdminService;
import com.johnbryce.couponSystem.services.CompanyService;
import com.johnbryce.couponSystem.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin
@Component
public class LoginManager {

    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;

    public LoginResDto login(String email, String password, ClientType clientType) throws CouponSystemException {
        UUID uuid;
        switch (clientType) {
            case ADMINISTRATOR:
                uuid = adminService.login(email, password, clientType);
                return new LoginResDto(1, email, uuid, clientType);
            case COMPANY:
                UUID uuid1 = companyService.login(email, password, clientType);
                int companyId = companyRepository.findIdByEmail(email);
                return new LoginResDto(companyId, email, uuid1, clientType);
            case CUSTOMER:
                UUID uuid2 = customerService.login(email, password, clientType);
                int customerId = customerRepository.findIdByEmail(email);
                return new LoginResDto(customerId, email, uuid2, clientType);
            default:
                return new LoginResDto(0, email, UUID.randomUUID(), clientType);
        }
    }
}
