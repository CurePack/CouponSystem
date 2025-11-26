import { Route, Routes, Navigate } from "react-router-dom";
import About from "../../PagesArea/About/About";
import Home from "../../PagesArea/Home/Home";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList from "../../CouponArea/CouponList/CouponList";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import PublicCouponList from "../../CouponArea/PublicCouponList/PublicCouponList";
import PurchaseCoupon from "../../CouponArea/PurchaseCoupon/PurchaseCoupon";
import CustomerCouponList from "../../CouponArea/CustomerCouponList/CustomerCouponList";
import CompanyList from "../../CompanyArea/CompanyList/CompanyList";
import CustomerList from "../../CustomerArea/CustomerList/CustomerList";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import EditCompany from "../../CompanyArea/EditCompany/EditCompany";
import DeleteCompany from "../../CompanyArea/DeleteCompany/DeleteCompany";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import EditCustomer from "../../CustomerArea/EditCustomer/EditCustomer";
import DeleteCustomer from "../../CustomerArea/DeleteCustomer/DeleteCustomer";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/store";
import DeletePurchasedCoupon from "../../CouponArea/DeletePurchasedCoupon/DeletePurchasedCoupon";
import { UserModel } from "../../../Models/UserModel";
import Profile from "../../PagesArea/Profile/Profile";

function Routing(): JSX.Element {

    const [user, setUser] = useState<UserModel>(store.getState().authState.user);


    return (
        <div className="Routing">
			
            <Routes>
                <Route path='/' element={<Navigate to="/home" replace />} />
                <Route path='/home' element={<Home/>}/>
                <Route path='/public/coupons' element={<PublicCouponList/>}/>

                <Route path='/admin/companies' element={<CompanyList/>}/>
                <Route path='/admin/companies/add' element={<AddCompany/>}/>
                <Route path='/admin/companies/edit/:id' element={<EditCompany/>}/>
                <Route path='/admin/companies/delete/:id' element={<DeleteCompany/>}/>
                <Route path='/admin/customers' element={<CustomerList/>}/>
                <Route path='/admin/customers/add' element={<AddCustomer/>}/>
                <Route path='/admin/customers/edit/:id' element={<EditCustomer/>}/>
                <Route path='/admin/customers/delete/:id' element={<DeleteCustomer/>}/>

                <Route path='/customers/coupons' element={<CustomerCouponList/>}/>
                <Route path='/customers/coupons/purchase/:id' element={<PurchaseCoupon/>}/>
                <Route path='/customers/coupons/delete/:id' element={<DeletePurchasedCoupon/>}/>

                <Route path='/coupons/add' element={<AddCoupon/>}/>
                <Route path='/companies/coupons' element={<CouponList/>}/>
                <Route path='/companies/coupons/edit/:id' element={<EditCoupon/>}/>
                <Route path='/companies/coupons/delete/:id' element={<DeleteCoupon/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='*' element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    );
}

export default Routing;
