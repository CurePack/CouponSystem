package com.johnbryce.couponSystem.mappers;

import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.dto.CompanyDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CompanyMapper implements Mapper<Company, CompanyDto> {
    private final DateMapper dateMapper;

    @Override
    public Company toDao(CompanyDto companyDto) {
        return Company.builder()
                .id(companyDto.getId())
                .name(companyDto.getName())
                .email(companyDto.getEmail())
                .password(companyDto.getPassword())
                .clientType(companyDto.getClientType())
                .image(companyDto.getImage())
                .build();
    }

    @Override
    public CompanyDto toDto(Company company) {
        return CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .email(company.getEmail())
                .password(company.getPassword())
                .clientType(company.getClientType())
                .image(company.getImage())
                .build();
    }

    @Override
    public List<Company> toDaoList(List<CompanyDto> companyDtos) {
        return companyDtos.stream().map(this::toDao).collect(Collectors.toList());
    }

    @Override
    public List<CompanyDto> toDtoList(List<Company> companies) {
        return companies.stream().map(this::toDto).collect(Collectors.toList());
    }
}
