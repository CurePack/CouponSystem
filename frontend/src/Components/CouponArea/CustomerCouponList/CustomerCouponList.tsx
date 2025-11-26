import "./CustomerCouponList.css";
import { useEffect, useState } from "react";
import { FaPlus, FaPlusCircle, FaSort } from "react-icons/fa";
import { Coupon } from "../../../Models/Coupon";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getCoupons } from "../../../WebApi/PublicApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import CouponItem from "../CouponItem/CouponItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import store from "../../../Redux/store";
import { couponsClearAction, couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { UserModel } from "../../../Models/UserModel";
import { getCompanyCoupons } from "../../../WebApi/CompaniesApi";
import { getCustomerCoupons, getCustomerCouponsByCategory, getCustomerCouponsByMaxPrice } from "../../../WebApi/CustomersApi";
import { CouponModel } from "../../../Models/CouponModel";
import { Link, useNavigate } from "react-router-dom";
import Category from "../../../Models/Category";

function CustomerCouponList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();
  const [showBack, setShowBack] = useState<boolean>(false);

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])


  //Side effect goes here
  useEffect(() => {
        getCustomerCoupons()
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

  const showAll = () => {
    getCoupons()
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
  };
  const showCategory = () => {
    if (category != '') {
      getCustomerCouponsByCategory(category || '')
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
    }
    
  };
  const showPrice = () => {
    if (maxPrice != '') {
      getCustomerCouponsByMaxPrice(maxPrice || '')
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
    }
    
  };

  return (
    <div className="CustomerCouponList">
      <div className="shop-header">
        <button className="btn pill-btn toggle-btn" onClick={() => setShowBack(!showBack)}>
          {showBack ? "Hide" : "Reveal"}
        </button>
        <div className="shop-title">
          <h1>My Coupons</h1>
          <p className="shop-subtitle">Your collected treasures from across Middle-earth.</p>
        </div>
        <div className="filter-inline"></div>
      </div>
      {coupons?.length > 0 ? (
        <div className="container">
          {/*{coupons.map((coupon) => (<CouponItem key={coupon.id} coupon={coupon} />))}*/}
          {coupons.map((coupon) => (
            <FlipCard key={coupon.id} coupon={coupon} listType={"coupons.customer"} forceBack={showBack} />
          ))}
        </div>
        
      ) : (
        <EmptyView msg="No coupons for you!" />
      )}
    </div>
  );
}

export default CustomerCouponList;
