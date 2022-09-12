package com.johnbryce.couponSystem.controllers;

import com.johnbryce.couponSystem.dto.CompanyDto;
import com.johnbryce.couponSystem.dto.CustomerDto;
import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import com.johnbryce.couponSystem.security.TokenManager;
import com.johnbryce.couponSystem.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" ,allowedHeaders = "*")
public class AdminController {

    private final AdminService adminService;
    private final TokenManager tokenManager;

    @PostMapping("/companies")
    @ResponseStatus(HttpStatus.CREATED)
    public CompanyDto addCompany(@RequestBody CompanyDto companyDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.addCompany(companyDto);
    }

    @PutMapping("/companies/{id}")
    public CompanyDto updateCompany(@PathVariable int id, @RequestBody CompanyDto companyDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.updateCompany(id, companyDto);
    }

    @DeleteMapping("/companies/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        adminService.deleteCompanyById(id);
    }

    @GetMapping("/companies/{id}")
    public CompanyDto getSingleCompany(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.getSingleCompany(id);
    }

    @GetMapping("/companies")
    public List<CompanyDto> getAllCompanies(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.getAllCompany();
    }

    @PostMapping("/customers")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDto addCustomer(@RequestBody CustomerDto customerDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.addCustomer(customerDto);
    }

    @PutMapping("/customers/{id}")
    public CustomerDto updateCustomer(@PathVariable int id, @RequestBody CustomerDto customerDto, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.updateCustomer(id, customerDto);
    }

    @DeleteMapping("/customers/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        adminService.deleteCustomerById(id);
    }

    @GetMapping("/customers/{id}")
    public CustomerDto getSingleCustomer(@PathVariable int id, @RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.getSingleCustomer(id);
    }

    @GetMapping("/customers")
    public List<CustomerDto> getAllCustomers(@RequestHeader("Authorization") UUID token) throws CouponSystemException {
        if (!tokenManager.isAdmin(token)) {
            throw new CouponSystemException(ErrMsg.AUTH);
        }
        return adminService.getAllCustomer();
    }

//    @GetMapping("count")
//    public int getCount() {
//        return adminService.count();
//    }
}
