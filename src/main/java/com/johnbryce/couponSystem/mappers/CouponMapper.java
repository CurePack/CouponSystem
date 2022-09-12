package com.johnbryce.couponSystem.mappers;

import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.dto.CouponDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CouponMapper implements Mapper<Coupon, CouponDto> {

    private final DateMapper dateMapper;

    @Override
    public Coupon toDao(CouponDto couponDto) {
        return Coupon.builder()
                .id(couponDto.getId())
                .company(couponDto.getCompany())
                .title(couponDto.getTitle())
                .description(couponDto.getDescription())
                .category(couponDto.getCategory())
                .startDate(dateMapper.toTimestamp(couponDto.getStartDate()))
                .endDate(dateMapper.toTimestamp(couponDto.getEndDate()))
                .amount(couponDto.getAmount())
                .price(couponDto.getPrice())
                .image(couponDto.getImage())
                .build();
    }

    @Override
    public CouponDto toDto(Coupon coupon) {
        return CouponDto.builder()
                .id(coupon.getId())
                .company(coupon.getCompany())
                .title(coupon.getTitle())
                .description(coupon.getDescription())
                .category(coupon.getCategory())
                .startDate(dateMapper.toLocalDateTime(coupon.getStartDate()))
                .endDate(dateMapper.toLocalDateTime(coupon.getEndDate()))
                .amount(coupon.getAmount())
                .price(coupon.getPrice())
                .image(coupon.getImage())
                .build();
    }

    @Override
    public List<Coupon> toDaoList(List<CouponDto> couponDtos) {
        return couponDtos.stream().map(this::toDao).collect(Collectors.toList());
    }

    @Override
    public List<CouponDto> toDtoList(List<Coupon> coupons) {
        return coupons.stream().map(this::toDto).collect(Collectors.toList());
    }
}
