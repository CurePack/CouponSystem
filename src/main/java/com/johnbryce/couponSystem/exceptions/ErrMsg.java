package com.johnbryce.couponSystem.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrMsg {
    ID_NOT_EXIST("id not found", HttpStatus.NOT_FOUND),
    ALREADY_EXIST("id already exists", HttpStatus.CONFLICT),
    EMAIL_EXIST("email already exists", HttpStatus.CONFLICT),
    NAME_EXIST("name already exists", HttpStatus.CONFLICT),
    TITLE_EXIST("title already exists", HttpStatus.CONFLICT),
    TITLE_NOT_EXIST("title not found", HttpStatus.NOT_FOUND),
    BAD_INPUT("bad input bro", HttpStatus.FORBIDDEN),
    OUT_OF_COUPONS("sorry bro, no coupons left...", HttpStatus.FORBIDDEN),
    EMAIL_OR_PASSWORD_INCORRECT("Wrong email or password", HttpStatus.UNAUTHORIZED),
    USER_ID_NOT_FOUND("Hi...login please", HttpStatus.UNAUTHORIZED),
    USER_ID_NOT_MATCH_TASK("Invalid Operation", HttpStatus.FORBIDDEN),
    AUTH("NOT AUTHORIZED", HttpStatus.UNAUTHORIZED),
    COUPON_EXPIRED("Sorry, coupon expired...", HttpStatus.FORBIDDEN),
    LOGIN_FAILED("Login failed bro...", HttpStatus.BAD_REQUEST),
    COUPON_ALREADY_OWNED("You already have this coupon bro...", HttpStatus.CONFLICT),
    NO_COUPONS_LEFT("Coupon's amount reached '0', now it's deleted.", HttpStatus.CONFLICT);


    private String description;
    private HttpStatus status;

    ErrMsg(String description, HttpStatus status) {
        this.description = description;
        this.status = status;
    }


    public String getDescription() {
        return description;
    }

    public HttpStatus getStatus() { return status; }
}
