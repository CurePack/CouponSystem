import { useEffect, useState } from "react";
import { FaFilter, FaRedo, FaTag, FaDollarSign } from "react-icons/fa";
import notify, { ErrMsg } from "../../../Services/Notifications";
import { getCoupons, getCouponsByCategory, getCouponsByMaxPrice } from "../../../WebApi/PublicApi";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import "./PublicCouponList.css";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import store from "../../../Redux/store";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";

function PublicCouponList(): JSX.Element {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const [baseCoupons, setBaseCoupons] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const [category, setCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
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
        getCoupons()
        .then((res) => {
          // Update component state
          setCoupons(res.data);
          setBaseCoupons(res.data);
          // Update app state
          store.dispatch(couponsDownloadedAction(res.data));
          // notify.success(SccMsg.GOT_COUPONS);
        })
        .catch((err) => {
          notify.error(err);
        });
  }, []);

  const applyFilters = () => {
    let filtered = [...baseCoupons];
    if (category) {
      filtered = filtered.filter(c => (c.category || "").toLowerCase() === category.toLowerCase());
    }
    if (maxPrice) {
      const max = Number(maxPrice);
      filtered = filtered.filter(c => Number(c.price) <= max);
    }
    setCoupons(filtered);
  };

  const showAll = () => {
    setCategory("");
    setMaxPrice("");
    setCoupons(baseCoupons);
  };

  return (
    <div className="PublicCouponList">
      <div className="shop-header">
        <button className="btn pill-btn toggle-btn" onClick={() => setShowBack(!showBack)}>
          {showBack ? "Hide" : "Reveal"}
        </button>
        <div className="shop-title">
          <h1>Coupon Shop</h1>
          <p className="shop-subtitle">Browse Middle-earth offers or filter by realm and coin.</p>
        </div>
        <div className="filter-inline">
          <div className="filter-group">
            <select name="categories" id="categories" value={category} onChange={c => setCategory(c.target.value)}>
                <option value="">All categories</option>
                <option value="food">Food</option>
                <option value="equipment">Equipment</option>
                <option value="travel">Travel</option>
                <option value="weapons">Weapons</option>
                <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="filter-group">
            <input
              className="max-price-input"
              type="number"
              min={1}
              value={maxPrice}
              name="maxPrice"
              id="maxPrice"
              placeholder="Max Price"
              onChange={e => setMaxPrice((e.target.value))}
              onWheel={e => e.preventDefault()}
            />
          </div>
          <div className="filter-actions">
            <button onClick={applyFilters} className="btn pill-btn">Apply</button>
            <button onClick={showAll} className="btn pill-btn ghost"><FaRedo /> Reset</button>
          </div>
        </div>
      </div>
      
      {coupons?.length > 0 ? (
        <div className="container">
          {coupons.map((coupon) => (
            <FlipCard key={coupon.id} coupon={coupon} listType={"coupons.public"} forceBack={showBack} />
          ))}
        </div>
      ) : (
        <EmptyView msg="No coupons for you!" />
      )}
    </div>
  );
}

export default PublicCouponList;
