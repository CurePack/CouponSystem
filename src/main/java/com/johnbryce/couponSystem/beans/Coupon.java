package com.johnbryce.couponSystem.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "coupons")
@Data
@AllArgsConstructor
@SuperBuilder
public class Coupon extends Base {

    public Coupon() {
        super();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false, unique = true, length = 45)
    private String title;

    private String description;
    private Timestamp startDate;
    private Timestamp endDate;

    private int amount;

    private double price;
    private String image;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Coupon coupon = (Coupon) o;
        return id != 0 && Objects.equals(id, coupon.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
