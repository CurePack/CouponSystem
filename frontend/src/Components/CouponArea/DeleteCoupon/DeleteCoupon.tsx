import "./DeleteCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../Redux/CouponsAppState";
import { ImCheckmark, ImCross } from "react-icons/im";
import store from "../../../Redux/store";
import { deleteCoupon } from "../../../WebApi/CompaniesApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";


function DeleteCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || "");
  const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponReducer.coupons.filter(coupon => coupon.id === id)[0]);

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const yes = () => {
    deleteCoupon(id)
      .then((any) => {
        notify.success(SccMsg.DELETED_COUPON);
        store.dispatch(couponDeletedAction(id));
        navigate("/companies/coupons");
      })
      .catch((err) => notify.error(err));
  };

  const no = () => {
    navigate("/companies/coupons");
  };

  return (
    <div className="DeleteCoupon">
      <div className="box">
        <h2>Delete Coupon</h2>
        <p>Are you sure you want to delete this, my precious?</p>
        <FlipCard key={coupon.id} coupon={coupon} listType={"single.coupon"} />
        <span>
          <ImCross className="cross"size={42} onClick={no}/>
          <ImCheckmark className="check" size={50} onClick={yes}/>
        </span>
      </div>
    </div>
  );
}

export default DeleteCoupon;
