package com.johnbryce.couponSystem.repos;

import com.johnbryce.couponSystem.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    boolean existsByEmail(String email);
    boolean existsByEmailAndPassword(String email,String password);
    Customer findTop1ByEmail(String email);
    boolean existsByPassword(String password);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO customers_coupons (customer_id, coupons_id) VALUES (:customerId, :couponId)", nativeQuery = true)
    void buyCoupon(int customerId, int couponId);

    @Query(value = "SELECT id FROM couponsdb2.customers WHERE email = :email and password = :password", nativeQuery = true)
    int loggedCustomer(String email, String password);

    @Query(value = "SELECT id FROM couponsdb2.customers WHERE email = :email", nativeQuery = true)
    int findIdByEmail(String email);



    //Customer findById(int id);
}
