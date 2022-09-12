package com.johnbryce.couponSystem.security;

import com.johnbryce.couponSystem.beans.ClientType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Information {
    private int id;
    private String email;
    private ClientType clientType;
    private LocalDateTime time = LocalDateTime.now();

    public Information(int id, String email, ClientType clientType) {
        this.id = id;
        this.email = email;
        this.clientType = clientType;
    }
}
