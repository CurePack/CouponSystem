export class CredentialsModel {
    public email: string;
    public password: string;
    public clientType: string;

    public constructor(email?: string, password?: string, clientType?: string) {
        this.email = email || '';
        this.password = password || '';
        this.clientType = clientType || '';
    }
}

