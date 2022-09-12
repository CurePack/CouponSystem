package com.johnbryce.couponSystem.repos;

import com.johnbryce.couponSystem.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndPassword(String email,String password);

    Company findTop1ByEmail(String email);

    boolean existsByPassword(String password);

    boolean existsByName(String name);

    @Query(value = "SELECT id FROM couponsdb2.companies WHERE email = :email", nativeQuery = true)
    int findIdByEmail(String email);

    @Query(value = "SELECT id FROM couponsdb2.companies WHERE email = :email and password = :password", nativeQuery = true)
    int loggedCompany(String email, String password);




}
