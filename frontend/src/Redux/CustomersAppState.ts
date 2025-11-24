import { CustomerModel } from "../Models/CustomerModel";

// Step 1 - Create AppState and manage the collection once and in one place
export class CustomersAppState {
    public customers: CustomerModel[] = [];
}

// Step 2 - Define all possible actions for your app state
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted",
    CustomersClear = "CustomersClear"
}

// Step 3 - Define Action Interface to describe action & payload if needed
export interface CustomersAction {
    type: CustomersActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customersDownloadedAction(customers: CustomerModel[]): CustomersAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customerAddedAction(customer: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customerUpdatedAction(customer: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customerDeletedAction(id: number): CustomersAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersClearAction(): CustomersAction {
    return { type: CustomersActionType.CustomersClear, payload: {} };
}

// Step 5 - Reducer function perform the required action
export function customersReducer(currentState: CustomersAppState = new CustomersAppState(), action: CustomersAction): CustomersAppState {
    const newState = {...currentState} // Spread Operator
    switch(action.type){
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated:
            const idx = newState.customers.findIndex(customer => customer.id === action.payload.id);
            newState.customers[idx]=action.payload;
            break;
        case CustomersActionType.CustomerDeleted:
            newState.customers = newState.customers.filter(c=>c.id !== action.payload);
            break;
        case CustomersActionType.CustomersClear:
            newState.customers = [];
            break;
    }
    return newState;
}