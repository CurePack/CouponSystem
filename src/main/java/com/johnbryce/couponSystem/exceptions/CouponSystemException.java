package com.johnbryce.couponSystem.exceptions;

public class CouponSystemException extends Exception {

    private ErrMsg errMsg;

    public CouponSystemException(ErrMsg errMsg) {
        super(errMsg.getDescription());
        this.errMsg = errMsg;
    }

    public ErrMsg getErrMsg() {
        return errMsg;
    }
}
