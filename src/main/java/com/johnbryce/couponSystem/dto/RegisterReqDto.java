package com.johnbryce.couponSystem.dto;

import com.johnbryce.couponSystem.beans.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class RegisterReqDto {

    private String email;
    private String password;
    private ClientType clientType;

}
