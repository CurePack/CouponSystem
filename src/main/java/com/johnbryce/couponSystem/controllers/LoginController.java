package com.johnbryce.couponSystem.controllers;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.dto.LoginReqDto;
import com.johnbryce.couponSystem.dto.LoginResDto;
import com.johnbryce.couponSystem.dto.RegisterReqDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import com.johnbryce.couponSystem.exceptions.ExceptionUtils;
import com.johnbryce.couponSystem.login.LoginManager;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import com.johnbryce.couponSystem.services.AdminService;
import com.johnbryce.couponSystem.services.CompanyService;
import com.johnbryce.couponSystem.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/users")
public class LoginController {

    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final LoginManager loginManager;

    @PostMapping("login")
    public LoginResDto login(@RequestBody LoginReqDto loginReqDto) throws CouponSystemException {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();
        ClientType clientType = loginReqDto.getClientType();
        return loginManager.login(email, password, clientType);
    }

//    @PostMapping("register")
//    @ResponseStatus(HttpStatus.CREATED)
//    public void register(@RequestBody RegisterReqDto registerReqDto) throws CouponSystemException {
//        String email = registerReqDto.getEmail();
//        String password = registerReqDto.getPassword();
//        companyService.register(email, password);
//    }

//    @PostMapping("login")
//    @ResponseStatus(HttpStatus.CREATED)
//    public LoginResDto login(@RequestBody LoginReqDto loginReqDto) throws CouponSystemException {
//        String email = loginReqDto.getEmail();
//        String password = loginReqDto.getPassword();
//        UUID uuid = companyService.login(email, password);
//        ClientType clientType = tokenManager.getClientType(uuid);
//        return new LoginResDto(email, uuid, clientType);
//    }
}
