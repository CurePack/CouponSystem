package com.johnbryce.couponSystem.repos;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

    boolean existsByTitle(String title);

    void getAllById(int id);

    List<Coupon> findAll();

    Coupon findByIdAndCategory(int id, Category category);

    List<Coupon> findByCategory(Category category);

    @Query(value = "SELECT * FROM coupons WHERE price <= :price", nativeQuery = true)
    List<Coupon> getAllByPrice(double price);





    @Modifying
    @Transactional
    @Query(value = "DELETE FROM customers_coupons WHERE coupons_id = :couponId", nativeQuery = true)
    void deleteCouponPurchase(int couponId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM customers_coupons WHERE customer_id = :customerId", nativeQuery = true)
    void deleteCustomerCoupons(int customerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM coupons WHERE company_id = :companyId", nativeQuery = true)
    void deleteCompanyCoupons(int companyId);

    @Query(value = "SELECT CASE WHEN EXISTS (SELECT * FROM customers_coupons WHERE coupons_id = :couponId) THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
    boolean existsInPurchasedCoupons(int couponId);

    @Query(value = "SELECT CASE WHEN EXISTS (SELECT * FROM customers_coupons WHERE coupons_id = :couponId AND customer_id = :customerId) THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
    boolean existsInPurchasedCouponsForCustomer(int couponId, int customerId);

    boolean existsByIdAndCompany(int couponId, Company company);

    @Query(value = "SELECT coupons_id FROM customers_coupons WHERE customer_id = :customerId", nativeQuery = true)
    List<Integer> getCustomerCouponsIds(int customerId);

    @Query(value = "SELECT * FROM coupons WHERE company_id = :companyId AND category = :categoryString", nativeQuery = true)
    List<Coupon> getCompanyCouponsByCategory(int companyId, String categoryString);

    List<Coupon> findAllByCompany(Company company);

    Coupon findCouponById(int id);


//    @Query(value = "SELECT id FROM customers INNER JOIN customers_coupons ON customers.id = customers_coupons.customer_id", nativeQuery = true)
//    List<Coupon> getCustomerCoupons(int customerId);

    //Coupon getCouponUpToPrice(int price);


}
