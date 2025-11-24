class Globals {

}

class DevelopmentGlobals extends Globals {
    public urls = {
        users: 'http://localhost:8080/api/users/',
        company: 'http://localhost:8080/api/companies/',
        customer: 'http://localhost:8080/api/customers/',
        public: 'http://localhost:8080/api/public/',
        admin: 'http://localhost:8080/api/admin/'
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        users: 'http://localhost:8080/api/users/',
        company: 'http://localhost:8080/api/companies/',
        customer: 'http://localhost:8080/api/customers/',
        public: 'http://localhost:8080/api/public/',
        admin: 'http://localhost:8080/api/admin/'
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;