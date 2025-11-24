import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import { loginAction } from "../../../Redux/AuthAppState";
import { couponsClearAction, couponsDownloadedAction, couponsReducer } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import notify from "../../../Services/Notifications";
import { getCompanyCoupons } from "../../../WebApi/CompaniesApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authState.user);

      useEffect(() => {
        return store.subscribe(() => {
          setUser(store.getState().authState.user)
        });
      }, []);


    return (
        
        <div className="Menu">
            
            
            {(user?.clientType === 'ADMINISTRATOR')
                ?
                <>
                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/admin/companies">Companies</CustomLink>
                    <CustomLink to="/admin/customers">Customers</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/credits">Credits</CustomLink>
                </>
                :
                (user?.clientType === 'COMPANY')
                ?
                <>
                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/companies/coupons">My Coupons</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/credits">Credits</CustomLink>
                </>
                :
                (user?.clientType === 'CUSTOMER')
                ?
                <>
                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/public/coupons">Coupons Shop</CustomLink>
                    <CustomLink to="/customers/coupons">My Coupons</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/credits">Credits</CustomLink>
                </>
                :
                <>
                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/credits">Credits</CustomLink>
                </>
                }
        </div>
    );
}

export default Menu;
