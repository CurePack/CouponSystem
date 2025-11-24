import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { couponDeletedAction, couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { deletePurchasedCoupon, getSingleCoupon } from "../../../WebApi/CustomersApi";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import { ImCheckmark, ImCross } from "react-icons/im"
import "./DeletePurchasedCoupon.css";

function DeletePurchasedCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");
    const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponReducer.coupons.filter(coupon => coupon.id === id)[0]);

    const yes = () => {
        deletePurchasedCoupon(id)
        .then((any) => {
            notify.success(SccMsg.DELETED_COUPON);
            store.dispatch(couponDeletedAction(id));
            navigate("/customers/coupons");
        })
        .catch((err) => notify.error(err));
    };

    const no = () => {
        navigate("/customers/coupons");
    };

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authState.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])

    return (
        <div className="DeletePurchasedCoupon">
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

export default DeletePurchasedCoupon;
