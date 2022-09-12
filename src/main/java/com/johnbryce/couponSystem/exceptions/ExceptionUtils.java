package com.johnbryce.couponSystem.exceptions;

public class ExceptionUtils {
    public static CouponSystemException idNotExist(){
        return new CouponSystemException(ErrMsg.ID_NOT_EXIST);
    }

    public static CouponSystemException idAlreadyExist(){
        return new CouponSystemException(ErrMsg.ALREADY_EXIST);
    }
}
