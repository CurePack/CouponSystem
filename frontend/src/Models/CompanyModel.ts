import { CouponModel } from "./CouponModel";

export class CompanyModel {
    public id?:number;
    public clientType?:string;
    public name?:string;
    public email?:string;
    public coupons?:CouponModel;
    public image?:string;

    public constructor(id?:number, clientType?:string, name?:string, email?:string, coupons?:CouponModel, image?:string){
        this.id = id;
        this.clientType = clientType;
        this.name = name;
        this.email = email;
        this.coupons = coupons;
        this.image = image;
    }
}

export enum Color{
    RED,GREEN
}