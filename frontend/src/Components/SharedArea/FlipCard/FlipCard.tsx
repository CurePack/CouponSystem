import { useState } from "react";
import { FaApple, FaEdit, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { number } from "yup/lib/locale";
import { CompanyModel } from "../../../Models/CompanyModel";
import { Coupon } from "../../../Models/Coupon";
import { CouponModel } from "../../../Models/CouponModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import CustomLink from "../CustomLink/CustomLink";
import ILDate from "../ILDate/ILDate";
import ILTime from "../ILTime/ILTime";
import "./FlipCard.css";

interface FlipCardProps {
  coupon: CouponModel;
  listType: string;
}
function FlipCard(props: FlipCardProps): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  const pic = require("../../../Assets/Images/Coupons/" + props.coupon.image);

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {props.coupon.amount === 0 && props.listType === "coupons.public" ? <><div className="ribbon ribbon-top-left"><span>Sold Out</span></div></> : <></>}
          <img src={pic} />
        </div>
        <div className="flip-card-back">
          {props.listType === "coupons.company" ? ( ///// COMPANY COUPONS:
            <>
              <h1>{props.coupon.title}</h1>
              <p>{props.coupon.description}</p>
              <p>{props.coupon.amount} coupons left</p>
              <p>Price: {props.coupon.price}</p>
              <p>
                <ILDate date={props.coupon.endDate || new Date()} />
                <ILTime date={props.coupon.endDate || new Date()} />
              </p>
              <div className="buttons">
                <Link to={`/companies/coupons/edit/${props.coupon.id}`}>
                  <FaEdit size={42} />
                </Link>
                <Link to={`delete/${props.coupon.id}`}>
                  <FaTrash size={42} />
                </Link>
              </div>
            </>
          ) : props.listType === "coupons.public" ? ( ///// PUBLIC COUPONS:
            <>
              <h1>{props.coupon.title}</h1>
              <p>{props.coupon.description}</p>
              <p>{props.coupon.amount} coupons left</p>
              <p>Price: {props.coupon.price}</p>
              <p>
                <ILDate date={props.coupon.endDate || new Date()} />
                <ILTime date={props.coupon.endDate || new Date()} />
              </p>
              <div className="purchaseButton">
                <Link to={`/customers/coupons/purchase/${props.coupon.id}`}>
                    <FaShoppingCart size={42} className="cart"/>
                </Link>
              </div>
            </>
          ) : props.listType === "coupons.customer" ? ( ///// CUSTOMER COUPONS:
            <>
              <h1>{props.coupon.title}</h1>
              <p>{props.coupon.description}</p>
              <p>
                <ILDate date={props.coupon.endDate || new Date()} />
                <ILTime date={props.coupon.endDate || new Date()} />
              </p>
              <div className="removeButton">
                <Link to={`/customers/coupons/delete/${props.coupon.id}`}>
                    <FaTrash size={42} className="trash"/>
                </Link>
              </div>
            </>
          ) : props.listType === "single.coupon" ? ( ///// SHOW SINGLE COUPON:
            <>
              <h1>{props.coupon.title}</h1>
              <p>{props.coupon.description}</p>
              <p>Price: {props.coupon.price}</p>
            </>
          ) : <></>
          }
        </div>

      </div>
    </div>
  );
}

export default FlipCard;
