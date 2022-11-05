package com.johnbryce.couponSystem.mappers;

import com.johnbryce.couponSystem.beans.Customer;
import com.johnbryce.couponSystem.dto.CustomerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CustomerMapper implements Mapper<Customer, CustomerDto> {
    private final DateMapper dateMapper;

    @Override
    public Customer toDao(CustomerDto customerDto) {
        return Customer.builder()
                .id(customerDto.getId())
                .email(customerDto.getEmail())
                .password(customerDto.getPassword())
                .firstName(customerDto.getFirstName())
                .lastName(customerDto.getLastName())
                .clientType(customerDto.getClientType())
                .image(customerDto.getImage())
                .build();
    }

    @Override
    public CustomerDto toDto(Customer customer) {
        return CustomerDto.builder()
                .id(customer.getId())
                .email(customer.getEmail())
                .password(customer.getPassword())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .clientType(customer.getClientType())
                .image(customer.getImage())
                .build();
    }

    @Override
    public List<Customer> toDaoList(List<CustomerDto> customerDtos) {
        return customerDtos.stream().map(this::toDao).collect(Collectors.toList());
    }

    @Override
    public List<CustomerDto> toDtoList(List<Customer> customers) {
        return customers.stream().map(this::toDto).collect(Collectors.toList());
    }
}
