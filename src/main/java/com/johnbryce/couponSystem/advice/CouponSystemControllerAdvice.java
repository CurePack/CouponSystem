package com.johnbryce.couponSystem.advice;

import com.johnbryce.couponSystem.exceptions.CouponSystemException;
import com.johnbryce.couponSystem.exceptions.ErrMsg;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;


@RestControllerAdvice
public class CouponSystemControllerAdvice {

//    @ExceptionHandler(value = {TodoAppException.class})
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ErrDto handleErrors(Exception e){
//        return new ErrDto("Todo Application",e.getMessage());
//    }

    @ExceptionHandler(value = {MissingRequestHeaderException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrDto handleMissingHeaders(MissingRequestHeaderException e){
        return new ErrDto("CouponSystem Application",e.getMessage());
    }
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrDto handleMissingHeaders(MethodArgumentTypeMismatchException e){
        return new ErrDto("CouponSystem Application",e.getMessage());
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ErrDto handle404() {
        return new ErrDto("CouponSystem Application","Page Not Found 4-0-4");
    }


    @ExceptionHandler(value = {CouponSystemException.class})
    public ResponseEntity<?> handleErrors(CouponSystemException e) {
        ErrMsg errMsg = e.getErrMsg();
        HttpStatus status = errMsg.getStatus();
        ErrDto errDto = new ErrDto("CouponSystem Application", e.getMessage());
        return new ResponseEntity<>(errDto, status);

    }
}
