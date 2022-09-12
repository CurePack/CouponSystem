package com.johnbryce.couponSystem.dto;

import com.johnbryce.couponSystem.beans.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class RegisterResDto {

    private String email;
    private UUID token;
    private ClientType clientType;
}
