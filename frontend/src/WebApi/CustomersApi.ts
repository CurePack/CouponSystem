import axios from "axios";
import Category from "../Models/Category";
import { Coupon } from "../Models/Coupon";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import { UserModel } from "../Models/UserModel";
import store from "../Redux/store";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getCustomerCoupons() {
    return await tokenAxios.get<CouponModel[]>(globals.urls.customer+"coupons");
};

export async function getCustomerCouponsByCategory(category:string) {
    return await tokenAxios.get<CouponModel[]>(globals.urls.customer+"coupons/"+category);
};

export async function getCustomerCouponsByMaxPrice(maxPrice:string) {
    return await tokenAxios.get<CouponModel[]>(globals.urls.customer+"coupons/uptoprice/"+maxPrice);
};

export async function purchaseCoupon(couponId:number, customerModel:CustomerModel) {
    console.log({couponId},'<<<<Coupon Customer>>>' ,{customerModel})
    return await tokenAxios.post<CouponModel>(globals.urls.customer+"coupons/purchase/"+couponId, customerModel);
};

export async function deletePurchasedCoupon(id:number) {
    return await tokenAxios.delete<any>(globals.urls.customer+"coupons/delete/"+id);
};

export async function getSingleCoupon(id:number) {
    return await tokenAxios.get<CouponModel>(globals.urls.customer+"coupon/"+id);
};