export class UserModel {
    public id: number;
    public email: string;
    public token: string;
    public clientType: string;

    public constructor(id?: number, email?: string, token?: string, clientType?: string) {
        this.id = id || 0;
        this.email = email || '';
        this.token = token || '';
        this.clientType = clientType || '';
    }
}
