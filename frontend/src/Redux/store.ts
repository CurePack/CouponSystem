import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { couponsReducer } from "./CouponsAppState";
import { companiesReducer } from "./CompaniesAppState";
import { customersReducer } from "./CustomersAppState";


// Multiple Reducers
const reducers = combineReducers
    ({
        couponReducer: couponsReducer,
        customerReducer: customersReducer,
        companyReducer: companiesReducer,
        authState: authReducer
    });
const store = createStore(reducers);

export default store;