import { useEffect, useState } from "react";
import { FaOilCan, FaPlusCircle } from "react-icons/fa";
import { Coupon } from "../../../Models/Coupon";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getCoupons } from "../../../WebApi/PublicApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import CouponItem from "../CouponItem/CouponItem";
import "./CouponList.css";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import store from "../../../Redux/store";
import { couponsClearAction, couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { UserModel } from "../../../Models/UserModel";
import { getCompanyCoupons } from "../../../WebApi/CompaniesApi";
import { getCustomerCoupons } from "../../../WebApi/CustomersApi";
import { CouponModel } from "../../../Models/CouponModel";
import { useNavigate } from "react-router-dom";

function CouponList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);



  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  //Side effect goes here
  useEffect(() => {
        getCompanyCoupons()
        .then((res) => {
          // Update component state
          setCoupons(res.data);
          // Update app state
          store.dispatch(couponsDownloadedAction(res.data));
          // notify.success(SccMsg.GOT_COUPONS);
        })
        .catch((err) => {
          notify.error(err);
        });
}, []);

  return (
    <div className="CouponList">
      <h1>List of Coupons</h1>
      <CustomLink to="/coupons/add">
        <FaPlusCircle size={42} />
      </CustomLink>

      


      {coupons?.length > 0 ? (
        <div className="container">
          {/*{coupons.map((coupon) => (<CouponItem key={coupon.id} coupon={coupon} />))}*/}
          {coupons.map((coupon) => (
            <FlipCard key={coupon.id} coupon={coupon} listType={"coupons.company"}/>
          ))}
        </div>
      ) : (
        <EmptyView msg="No coupons for you!" />
      )}
    </div>
  );
}

export default CouponList;
