import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Coupon } from "../../../Models/Coupon";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getCoupons, getCouponsByCategory, getCouponsByMaxPrice } from "../../../WebApi/PublicApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import CouponItem from "../CouponItem/CouponItem";
import "./PublicCouponList.css";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import store from "../../../Redux/store";
import { couponsClearAction, couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { UserModel } from "../../../Models/UserModel";
import { getCompanyCoupons } from "../../../WebApi/CompaniesApi";
import { getCustomerCoupons, getCustomerCouponsByCategory } from "../../../WebApi/CustomersApi";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "../CouponCard/CouponCard";

function PublicCouponList(): JSX.Element {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const [category, setCategory] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();


useEffect(() => {
  // If we don't have a user object - we are not logged in
  if (!store.getState().authState.user.token) {
      notify.error(ErrMsg.PLS_LOGIN);
      navigate('/login');
  }
},[])

  //Side effect goes here
  useEffect(() => {
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
      getCouponsByCategory(category || '')
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
      getCouponsByMaxPrice(maxPrice || '')
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
    <div className="PublicCouponList">
      <h1>Coupon Shop</h1>
      <div className="selectMenu">
        <label htmlFor="categories" >Filter</label>
        <select name="categories" id="categories" onChange={c => setCategory(c.target.value)}>
            <option selected disabled={true}>Choose category</option>
            <option value="food">Food</option>
            <option value="equipment">Equipment</option>
            <option value="travel">Travel</option>
            <option value="weapons">Weapons</option>
            <option value="entertainment">Entertainment</option>
        </select>
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" min={1} value={maxPrice} name="maxPrice" id="maxPrice" onChange={e => setMaxPrice((e.target.value))} />
        <button name = "button1" disabled={false} onClick={showCategory}>By Category</button>
        <button name = "button1" disabled={false} onClick={showPrice}>By Price</button>
        <button name = "button1" disabled={false} onClick={showAll}>Show all</button>
      </div>
      
      {coupons?.length > 0 ? (
        <div className="container">
          {coupons.map((coupon) => (
            <FlipCard key={coupon.id} coupon={coupon} listType={"coupons.public"} />
          ))}
        </div>
      ) : (
        <EmptyView msg="No coupons for you!" />
      )}
    </div>
  );
}

export default PublicCouponList;
