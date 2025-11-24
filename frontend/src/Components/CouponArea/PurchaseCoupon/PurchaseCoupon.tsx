import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { CouponModel } from "../../../Models/CouponModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { purchaseCoupon } from "../../../WebApi/CustomersApi";
import { ImCheckmark, ImCross } from "react-icons/im"
import "./PurchaseCoupon.css";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";

function PurchaseCoupon(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || "");
  const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponReducer.coupons.filter(coupon => coupon.id === id)[0]);
  const customerModel = new CustomerModel;
  customerModel.id = user.id;

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const yes = () => {
    purchaseCoupon(id, customerModel)
      .then((any) => {
        notify.success(SccMsg.PURCHASE_SUCCESS);
        //store.dispatch(coupon);
        navigate("/customers/coupons");
      })
      .catch((err) => notify.error(err));
  };

  const no = () => {
    navigate("/public/coupons");
  };

  return (
    <div className="PurchaseCoupon">
      <div className="box">
        <h2>Purchase Coupon</h2>
        <p>Are you sure you want to buy this, my precious?</p>
        <FlipCard key={coupon.id} coupon={coupon} listType={"single.coupon"} />
        <span>
        <ImCross className="cross"size={42} onClick={no}/>
        <ImCheckmark className="check" size={50} onClick={yes}/>
        </span>
      </div>
    </div>
  );
}

export default PurchaseCoupon;
