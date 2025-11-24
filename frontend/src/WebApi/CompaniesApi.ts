import { CouponModel } from "../Models/CouponModel";
import store from "../Redux/store";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getCompanyCoupons() {
    return await tokenAxios.get<CouponModel[]>(globals.urls.company+"coupons");
};

export async function getCoupon(id:number) {
    return await tokenAxios.get<CouponModel>(globals.urls.company+"coupons/"+id);
};

export async function countCoupons() {
    return await tokenAxios.get<number>(globals.urls.admin+"count");
};

export async function addCoupon(coupon:CouponModel) {
    return await tokenAxios.post<CouponModel>(globals.urls.company,coupon);
};

export async function updateCoupon(id:number,coupon:CouponModel) {
    return await tokenAxios.put<CouponModel>(globals.urls.company+id,coupon);
};

export async function deleteCoupon(id:number) {
    return await tokenAxios.delete<any>(globals.urls.company+"coupons/delete/"+id);
};