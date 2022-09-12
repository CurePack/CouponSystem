package com.johnbryce.couponSystem.dto;

import com.johnbryce.couponSystem.beans.ClientType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDto {

    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private ClientType clientType;
    private String image;
}
