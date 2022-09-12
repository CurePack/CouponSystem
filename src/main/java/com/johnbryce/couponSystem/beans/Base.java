package com.johnbryce.couponSystem.beans;


import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
@Getter
@Setter
@ToString
@AllArgsConstructor
public abstract class Base {
    @CreationTimestamp
    @Column(name="CREATED_TIME")
    protected LocalDateTime creationTime;

    @UpdateTimestamp
    @Column(name="UPDATED_TIME")
    protected LocalDateTime updatedTime;
}
