export class CouponModel{
    public id?:number;
    public title?:string;
    public description?: string;
    public category?: string;
    public startDate?:Date;
    public endDate?:Date;
    public amount?:number;
    public price?:number;
    public image?:string;
    
    public constructor(id?:number, title?:string, description?: string, category?: string, startDate?:Date, endDate?:Date, amount?:number, price?:number, image?:string){
        this.id = id;
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

export enum Color{
    RED,GREEN
}