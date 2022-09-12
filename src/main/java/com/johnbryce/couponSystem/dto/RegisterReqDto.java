package com.johnbryce.couponSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class RegisterReqDto {

    private String email;
    private String password;


}
