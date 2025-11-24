import "./AddCoupon.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Coupon } from "../../../Models/Coupon";
import { addCoupon } from "../../../WebApi/CompaniesApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/store";
import {
  couponAddedAction,
  couponsClearAction,
  couponsDownloadedAction,
} from "../../../Redux/CouponsAppState";
import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";

function AddCoupon(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);
  const navigate = useNavigate();

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])
  
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    amount: yup
      .number()
      .required("Amount is required")
      .typeError("You must specify amount of coupons"),
    price: yup
      .number()
      .required("Price is required")
      .typeError("You must specify coupon price"),
    startDate: yup
      .date()
      .default(new Date())
      .typeError("You must specify coupon date")
      .required("StartDate is required")
      .nullable()
      .default(() => new Date()),
    endDate: yup
      .date()
      .default(new Date())
      .typeError("You must specify coupon date")
      .required("EndDate is required")
      .nullable()
      .default(() => new Date()),
    image: yup.string().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) as any });

  const sendToRemote = async (coupon: CouponModel) => {
    await addCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.ADDED_COUPON);
        // Updating global state
        store.dispatch(couponAddedAction(res.data));
        navigate("/companies/coupons");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <div className="AddCoupon">
      <h2>Let's add a coupon, shall we?</h2>
      <form onSubmit={handleSubmit(sendToRemote)}>
        <input
          type="text"
          {...register("title")}
          name="title"
          placeholder="title"
        />
        <br />
        <span>{errors.title?.message}</span>
        <br />
        <input
          type="text"
          {...register("description")}
          name="description"
          placeholder="description"
        />
        <br />
        <span>{errors.description?.message}</span>
        <br />
        <select {...register("category")} name="category">
          <option selected disabled={true}>
            Choose category
          </option>
          <option value="FOOD">Food</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="TRAVEL">Travel</option>
          <option value="WEAPONS">Weapons</option>
          <option value="ENTERTAINMENT">Entertainment</option>
        </select>
        <br />
        <span>{errors.category?.message}</span>
        <br />
        <input
          type="number"
          {...register("amount")}
          name="amount"
          placeholder="amount"
          min="1"
        />
        <br />
        <span>{errors.amount?.message}</span>
        <br />
        <input
          type="number"
          {...register("price")}
          name="price"
          placeholder="price"
        />
        <br />
        <span>{errors.price?.message}</span>
        <br />
        <input
          type="date"
          {...register("startDate")}
          name="startDate"
          placeholder="startDate"
        />
        <br />
        <span>{errors.startDate?.message}</span>
        <br />
        <input
          type="date"
          {...register("endDate")}
          name="endDate"
          placeholder="endDate"
        />
        <br />
        <span>{errors.endDate?.message}</span>
        <br />
        <select {...register("image")} name="image">
          <option value="adventure1.jpg">adventure1.jpg</option>
          <option value="entertainment1.jpg">entertainment1.jpg</option>
          <option value="entertainment2.jpg">entertainment2.jpg</option>
          <option value="equipment1.jpg">equipment1.jpg</option>
          <option value="food1.jpg">food1.jpg</option>
          <option value="food2.jpg">food2.jpg</option>
          <option value="hoodies1.jpg">hoodies1.jpg</option>
          <option value="houses1.jpg">houses1.jpg</option>
          <option value="houses2.jpg">houses2.jpg</option>
          <option value="iwantyouforadventure.jpg">iwantyouforadventure.jpg</option>
          <option value="light1.jpg">light.jpg</option>
          <option value="neutral1.jpg">neutral1.jpg</option>
          <option value="neutral2.jpg">neutral2.jpg</option>
          <option value="ring1.jpg">ring1.jpg</option>
          <option value="ring2.jpg">ring2.jpg</option>
          <option value="theEye1.jpg">theEye1.jpg</option>
          <option value="travel.jpg">travel.jpg</option>
          <option value="travelErebor.jpg">travelErebor.jpg</option>
          <option value="travelIsengard.jpg">travelIsengard.jpg</option>
          <option value="travelMordor.jpg">travelMordor.jpg</option>
          <option value="travelRivendell.jpg">travelRivendell.jpg</option>
          <option value="weapons1.jpg">weapons1.jpg</option>
          <option value="weapons2.jpg">weapons2.jpg</option>
        </select>
        <br />
        <span>{errors.image?.message}</span>
        <br />
        <button className="button-app">Add</button>
      </form>
    </div>
  );
}

export default AddCoupon;
