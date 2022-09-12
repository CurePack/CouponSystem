package com.johnbryce.couponSystem.dto;

import com.johnbryce.couponSystem.beans.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class LoginResDto {
    private int id;
    private String email;
    private UUID token;
    private ClientType clientType;
}
