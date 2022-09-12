package com.johnbryce.couponSystem.beans;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "companies")
@Data
@AllArgsConstructor
@SuperBuilder
public class Company extends Base {

    public Company() {
        super();
    }

    public Company(String email, String password, ClientType clientType) {
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(unique = true, length = 32)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private ClientType clientType;

    private String image;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Singular
    @ToString.Exclude
    private List<Coupon> coupons = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Company company = (Company) o;
        return id != 0 && Objects.equals(id, company.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

