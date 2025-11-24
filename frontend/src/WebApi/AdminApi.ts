import axios from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";


// ⬇️ COMPANIES ⬇️
export async function getCompanies() {
    return await tokenAxios.get<CompanyModel[]>(globals.urls.admin+"companies");
};

export async function addCompany(company:CompanyModel) {
    return await tokenAxios.post<CompanyModel>(globals.urls.admin+"companies",company);
};

export async function updateCompany(id:number, company:CompanyModel) {
    return await tokenAxios.put<CompanyModel>(globals.urls.admin+"companies/"+id,company);
};

export async function deleteCompany(id:number) {
    return await tokenAxios.delete<any>(globals.urls.admin+"companies/"+id);
};
// ⬆️ == END == ⬆️


// ⬇️ CUSTOMERS ⬇️
export async function getCustomers() {
    return await tokenAxios.get<CustomerModel[]>(globals.urls.admin+"customers");
};

export async function addCustomer(customer:CustomerModel) {
    return await tokenAxios.post<CustomerModel>(globals.urls.admin+"customers",customer);
};

export async function updateCustomer(id:number, customer:CustomerModel) {
    return await tokenAxios.put<CustomerModel>(globals.urls.admin+"customers/"+id,customer);
};

export async function deleteCustomer(id:number) {
    return await tokenAxios.delete<any>(globals.urls.admin+"customers/"+id);
};
// ⬆️ == END == ⬆️