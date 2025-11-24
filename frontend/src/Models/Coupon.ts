import { number } from "yup/lib/locale";

export class Coupon{
    public id?:number;
    public companyId?:number;
    public title?:string;
    public description?:string;
    public category?:string;
    public startDate?:Date;
    public endDate?:Date;
    public amount?:number;
    public price?:number;
    public image?:string;

    public constructor(id?:number, companyId?:number, title?:string, description?:string, category?:string, startDate?:Date, endDate?:Date, amount?:number, price?:number, image?:string){
        this.id = id;
        this.companyId = companyId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}