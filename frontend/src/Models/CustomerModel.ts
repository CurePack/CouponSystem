export class CustomerModel{
    public id?:number;
    public email?:string;
    public password?:string;
    public clientType?:string;
    public firstName?:string;
    public lastName?:string;
    public image?:string;
    
    public constructor(id?:number, email?:string, password?:string, clientType?:string, firstName?:string, lastName?:string, image?:string){
        this.id = id;
        this.email = email;
        this.password = password;
        this.clientType = clientType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
    }
}

export enum Color{
    RED,GREEN
}