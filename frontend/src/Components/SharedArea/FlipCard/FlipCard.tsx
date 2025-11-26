import { useState, useMemo } from "react";
import { FaEdit, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import ILDate from "../ILDate/ILDate";
import ILTime from "../ILTime/ILTime";
import "./FlipCard.css";

interface FlipCardProps {
  coupon: CouponModel;
  listType: string;
  forceBack?: boolean;
}
function FlipCard(props: FlipCardProps): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  const pic = require("../../../Assets/Images/Coupons/" + props.coupon.image);
  const isSoldOut = props.coupon.amount === 0 && props.listType === "coupons.public";
  const isPreview = props.listType === "coupons.preview";

  const badgeText = useMemo(() => {
    if (props.listType === "coupons.public" && isSoldOut) return "Sold out";
    if (props.listType === "coupons.company") return "Your coupon";
    if (props.listType === "coupons.customer") return "Owned";
    return props.coupon.category || "Coupon";
  }, [props.listType, isSoldOut, props.coupon.category]);

  return (
    <div className={`flip-card ${props.forceBack ? "force-flip" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {isSoldOut && (
            <div className="ribbon ribbon-top-left">
              <span>Sold Out</span>
            </div>
          )}
          <img src={pic} alt={props.coupon.title} />
        </div>
        <div className="flip-card-back">
          <div className="back-top">
            <h2 className="back-title">{props.coupon.title}</h2>
            <p className="desc back-desc">{props.coupon.description}</p>
          </div>
          <div className="dates">
            <span className="pill muted">Expiry date: <ILDate date={props.coupon.endDate || new Date()} /></span>
          </div>

          {props.listType === "coupons.company" && (
            <div className="buttons">
              <Link to={`/companies/coupons/edit/${props.coupon.id}`} className="btn-icon">
                <FaEdit size={32} />
              </Link>
              <Link to={`delete/${props.coupon.id}`} className="btn-icon danger">
                <FaTrash size={32} />
              </Link>
            </div>
          )}

          {(props.listType === "coupons.public" || isPreview) && (
            <div className="cta-row">
              <div className="pill-row">
                <span className={`pill amount ${props.coupon.amount && props.coupon.amount > 5 ? "ok" : "low"}`}>
                  left: {props.coupon.amount}
                </span>
                <span className="pill price">price: {props.coupon.price?.toFixed(2)}</span>
              </div>
              {!isPreview && !isSoldOut && (
                <Link to={`/customers/coupons/purchase/${props.coupon.id}`} className="btn-pill primary">
                  <FaShoppingCart /> Purchase
                </Link>
              )}
            </div>
          )}

          {props.listType === "coupons.customer" && (
            <div className="buttons">
              <Link to={`/customers/coupons/delete/${props.coupon.id}`} className="btn-pill danger">
                <FaTrash /> Remove
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default FlipCard;
