package com.johnbryce.couponSystem.clr;

import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Order(2)
public class AddCustomers implements CommandLineRunner {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {


        Customer customer1 = Customer.builder()
                .firstName("Frodo")
                .lastName("Baggins")
                .email("frodobaggins@gmail.com")
                .password("1234")
                .image("frodo1.jpg")
                .clientType(ClientType.CUSTOMER)
                .build();

        Customer customer2 = Customer.builder()
                .firstName("Samwise")
                .lastName("Gamgee")
                .email("samwisegamgee@gmail.com")
                .password("1234")
                .image("sam.jpg")
                .clientType(ClientType.CUSTOMER)
                .build();

        Customer customer3 = Customer.builder()
                .firstName("Gollum")
                .lastName("Smeagol")
                .email("gollum@gmail.com")
                .password("1234")
                .image("gollum2.jpg")
                .clientType(ClientType.CUSTOMER)
                .build();

        Customer customer4 = Customer.builder()
                .firstName("Aragorn")
                .lastName("Elessar")
                .email("aragorn@gmail.com")
                .password("1234")
                .image("aragorn1.jpg")
                .clientType(ClientType.CUSTOMER)
                .build();

        customerRepository.saveAll(Arrays.asList(customer1, customer2, customer3, customer4));
    }
}
