import "./CouponCard.css";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import image from "../../../Assets/Images/Coupons/ring2.jpg"


interface CouponCardProps {
  coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    return (
        <div className="card" style ={{backgroundImage:`url(${image})`}}>
            <h1>{props.coupon.title}</h1>
            <p>{props.coupon.description}</p>
            <p>{props.coupon.category}</p>
            <p>{props.coupon.amount}</p>
            <p>{props.coupon.price}</p>
			<div className="buttons">
                <Link to={`edit/${props.coupon.id}`}>
                    <FaEdit size={36} />
                </Link>
                <Link to={`delete/${props.coupon.id}`}>
                    <FaTrash size={36} />
                </Link>
            </div>
        </div>
    );
}

export default CouponCard;
