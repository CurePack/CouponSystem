package com.johnbryce.couponSystem.clr;

import com.johnbryce.couponSystem.beans.Category;
import com.johnbryce.couponSystem.beans.ClientType;
import com.johnbryce.couponSystem.beans.Company;
import com.johnbryce.couponSystem.beans.Coupon;
import com.johnbryce.couponSystem.mappers.DateMapper;
import com.johnbryce.couponSystem.repos.CompanyRepository;
import com.johnbryce.couponSystem.repos.CouponRepository;
import com.johnbryce.couponSystem.repos.CustomerRepository;
import com.johnbryce.couponSystem.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@Order(1)
public class AddCoupons implements CommandLineRunner {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private DateMapper dateMapper;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {

        Company company1 = Company.builder()
                .email("saruman@gmail.com")
                .password("1234")
                .name("Saruman Wizard")
                .image("saruman.jpg")
                .clientType(ClientType.COMPANY)
                .build();
        companyRepository.save(company1);

        Coupon c1 = Coupon.builder()
                .title("50% OFF TRIP")
                .company(company1)
                .description("50% off trip to Rivendell")
                .category(Category.TRAVEL)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(20)
                .price(75)
                .image("travelRivendell.jpg")
                .build();

        Coupon c2 = Coupon.builder()
                .title("2nd rootbeer 4free!")
                .company(company1)
                .description("Buy one rootbeer of any kind and get another one for free!")
                .category(Category.ENTERTAINMENT)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(300)
                .price(2.50)
                .image("entertainment2.jpg")
                .build();

        Coupon c3 = Coupon.builder()
                .title("20% discount")
                .company(company1)
                .description("Get your hands on the best rings in Middle Earth!")
                .category(Category.EQUIPMENT)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(100)
                .price(10)
                .image("ring1.jpg")
                .build();

        Coupon c4 = Coupon.builder()
                .title("150 Coins Giftcard")
                .company(company1)
                .description("For any equipment except shoes.")
                .category(Category.EQUIPMENT)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(150)
                .price(50)
                .image("equipment1.jpg")
                .build();

        Coupon c5 = Coupon.builder()
                .title("5% OFF")
                .company(company1)
                .description("Get a discount for any sword you like!")
                .category(Category.WEAPONS)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(80)
                .price(5)
                .image("weapons1.jpg")
                .build();

        Coupon c6 = Coupon.builder()
                .title("Free onion rings")
                .company(company1)
                .description("On orders at lunchtime and over 20 coins.")
                .category(Category.FOOD)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(100)
                .price(49.99)
                .image("food2.jpg")
                .build();

        Coupon c7 = Coupon.builder()
                .title("Ride to Mordor")
                .company(company1)
                .description("If you are brave enough...")
                .category(Category.TRAVEL)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(1)
                .price(10)
                .image("travelMordor.jpg")
                .build();

        Company company2 = Company.builder()
                .email("treebeard@gmail.com")
                .password("1234")
                .name("Treebeard the Oldest")
                .image("treebeard.jpg")
                .clientType(ClientType.COMPANY)
                .build();

        Coupon c8 = Coupon.builder()
                .title("2+1 all books")
                .company(company2)
                .description("Buy 2 get 1 for free!")
                .category(Category.ENTERTAINMENT)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(150)
                .price(1)
                .image("entertainment1.jpg")
                .build();

        Coupon c9 = Coupon.builder()
                .title("Trip to Erebor")
                .company(company2)
                .description("Visit the lonely mountain!")
                .category(Category.TRAVEL)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(45)
                .price(50)
                .image("travelErebor.jpg")
                .build();

        Coupon c10 = Coupon.builder()
                .title("30% OFF")
                .company(company2)
                .description("The whole menu on a great discount!")
                .category(Category.FOOD)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(100)
                .price(49.99)
                .image("food1.jpg")
                .build();

        Coupon c11 = Coupon.builder()
                .title("ALMOST FREE")
                .company(company2)
                .description("Visit Isengard!")
                .category(Category.TRAVEL)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(5)
                .price(10)
                .image("travelIsengard.jpg")
                .build();

        Company company3 = Company.builder()
                .email("sauron@gmail.com")
                .password("1234")
                .name("Sauron")
                .image("mordorEye1.jpg")
                .clientType(ClientType.COMPANY)
                .build();


        Coupon c12 = Coupon.builder()
                .title("70% OFF!")
                .company(company3)
                .description("To visit the great eye")
                .category(Category.TRAVEL)
                .startDate(Timestamp.valueOf(LocalDateTime.now()))
                .endDate(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
                .amount(12)
                .price(30)
                .image("theEye1.jpg")
                .build();

        companyRepository.save(company2);
        companyRepository.save(company3);
        couponRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12));
        customerService.addCouponPurchase(1,1);
        customerService.addCouponPurchase(1,2);
        customerService.addCouponPurchase(1,3);


    }
}
