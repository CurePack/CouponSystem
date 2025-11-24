import axios from "axios";
import { Coupon } from "../Models/Coupon";
import { CouponModel } from "../Models/CouponModel";
import store from "../Redux/store";
import globals from "../Services/Globals";

export async function getCoupons() {
    return await axios.get<CouponModel[]>(globals.urls.public);
};

export async function getCouponsByCategory(category: string) {
    return await axios.get<CouponModel[]>(globals.urls.public+category);
};

export async function getCouponsByMaxPrice(maxPrice: string) {
    return await axios.get<CouponModel[]>(globals.urls.public+"uptoprice/"+maxPrice);
};
