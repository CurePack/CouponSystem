import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Coupon } from "../../../Models/Coupon";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/store";
import ILDate from "../../SharedArea/ILDate/ILDate";
import ILTime from "../../SharedArea/ILTime/ILTime";
import "./CouponItem.css";

interface CouponItemProps {
  coupon: Coupon;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  return (
    <div className="CouponItem">
      <div>
        <p>Id:{props.coupon.id}</p>
        <p>Title:{props.coupon.title}</p>
        <p>Desc:{props.coupon.description?.substring(0, 15)}</p>
        <p>Category:{props.coupon.category}</p>
        <p>Amount:{props.coupon.amount}</p>
        <p>Price:{props.coupon.price}</p>
        {/* <ILDate date={props.coupon.when || new Date()} />
        <ILTime date={props.coupon.when || new Date()} /> */}
      </div>
      <div>
        <img src="https://picsum.photos/150" alt="" />
      </div>
      <div className="buttons">
        <FaTrash size={42} />
        <FaEdit size={42} />
      </div>
    </div>
  );
}

export default CouponItem;
