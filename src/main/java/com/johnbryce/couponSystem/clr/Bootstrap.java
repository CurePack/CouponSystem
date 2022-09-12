package com.johnbryce.couponSystem.clr;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.mappers.DateMapper;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CouponRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.time.LocalDateTime;
import java.util.Arrays;

//@Component                                                              // put in "comment" to disable this component
public class Bootstrap implements CommandLineRunner {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CouponRepository couponRepository;

    private DateMapper dateMapper;

    @Override
    public void run(String... args) throws Exception {

        Company company1 = Company.builder()
                .email("mac@donald.com")
                .password("Mcdonalds123")
                .name("McDonald's")
                .build();

        Company company2 = Company.builder()
                .email("kfried@chicken.com")
                .password("Kfc123")
                .name("KFC")
                .build();

        Company company3 = Company.builder()
                .email("cpu@intel.com")
                .password("Intel123")
                .name("Intel")
                .build();


        Customer customer1 = Customer.builder()
                .firstName("Dima")
                .lastName("Easy")
                .email("dimaez@gmail.com")
                .password("1234")
                .build();

        Customer customer2 = Customer.builder()
                .firstName("Jim")
                .lastName("Bob")
                .email("jimbob@gmail.com")
                .password("1234")
                .build();

        Customer customer3 = Customer.builder()
                .firstName("Nicolas")
                .lastName("Cage")
                .email("nicage@gmail.com")
                .password("1234")
                .build();



        companyRepository.saveAll(Arrays.asList(company1, company2, company3));
        customerRepository.saveAll(Arrays.asList(customer1, customer2, customer3));

        //CompanyService companyService1 = (CompanyService) loginManager.login(company1.getEmail(), company1.getPassword(), ClientType.Company);

    }
}
