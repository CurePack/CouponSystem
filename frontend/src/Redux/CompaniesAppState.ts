import { CompanyModel } from "../Models/CompanyModel";

// Step 1 - Create AppState and manage the collection once and in one place
export class CompaniesAppState {
    public companies: CompanyModel[] = [];
}

// Step 2 - Define all possible actions for your app state
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted",
    CompaniesClear = "CompaniesClear"
}

// Step 3 - Define Action Interface to describe action & payload if needed
export interface CompaniesAction {
    type: CompaniesActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function companiesDownloadedAction(Companies: CompanyModel[]): CompaniesAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: Companies };
}

export function companyAddedAction(company: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companyUpdatedAction(company: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companyDeletedAction(id: number): CompaniesAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

export function companiesClearAction(): CompaniesAction {
    return { type: CompaniesActionType.CompaniesClear, payload: {} };
}

// Step 5 - Reducer function perform the required action
export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(), action: CompaniesAction): CompaniesAppState {
    const newState = {...currentState} // Spread Operator
    switch(action.type){
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated:
            const idx = newState.companies.findIndex(company => company.id === action.payload.id);
            newState.companies[idx]=action.payload;
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(c=>c.id !== action.payload);
            break;
        case CompaniesActionType.CompaniesClear:
            newState.companies = [];
            break;
    }
    return newState;
}