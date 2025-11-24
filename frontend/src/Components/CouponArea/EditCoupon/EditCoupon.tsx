import { useNavigate, useParams } from "react-router-dom";
import "./EditCoupon.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../Models/CouponModel";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getCoupon, updateCoupon } from "../../../WebApi/CompaniesApi";
import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import store from "../../../Redux/store";
import { couponsDownloadedAction, couponUpdatedAction } from "../../../Redux/CouponsAppState";
import { Coupon } from "../../../Models/Coupon";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";

function EditCoupon(): JSX.Element {
  const params = useParams();
  const id = +(params.id || "");
  const [coupon, setCoupon] = useState<CouponModel>(store.getState().couponReducer.coupons.filter(coupon => coupon.id === id)[0]);
  const navigate = useNavigate();
  
  

  useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const schema = yup.object().shape({
    title: yup
    .string()
    .required("Title is required"),
    description: yup
    .string()
    .required("Description is required"),
    category: yup
    .string()
    .required("Category is required"),
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
    image: yup
    .string()
    .required("Image is required"),
  });

  let defaultValuesObj = { ...coupon };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) as any });

  const { dirtyFields } = useFormState ({
    control
  });

  const sendToRemote = async (coupon: CouponModel) => {
    await updateCoupon(id, coupon)
      .then((res) => {
        notify.success(SccMsg.UPDATED_COUPON);
        store.dispatch(couponUpdatedAction(res.data));
        navigate("/companies/coupons");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err);
        console.log(err.message);
      });
  };

  // useEffect(() => {

  //   setCoupon(store.getState().couponReducer.coupons.filter(coupon => coupon.id===id)[0]);

  //   getCoupon(id)
  //     .then((res) => {
  //       setCoupon(res.data);
  //       notify.success(SccMsg.GOT_SINGLE_COUPON);
  //     })
  //     .catch((err) => notify.error(err));
  // }, [id]);


  return (
    <div className="EditCoupon">
      <h2>So you want to edit this... ok.</h2>
      <form onSubmit={handleSubmit(sendToRemote)}>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" defaultValue={defaultValuesObj.title} {...register("title")} name="title" placeholder="title"/>
        <br />
        <span>{errors.title?.message}</span>
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input type="text" defaultValue={defaultValuesObj.description} {...register("description")} name="description" placeholder="description"/>
        <br />
        <span>{errors.description?.message}</span>
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <select {...register("category")} name="category" >
          <option value="FOOD">Food</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="TRAVEL">Travel</option>
          <option value="WEAPONS">Weapons</option>
          <option value="ENTERTAINMENT">Entertainment</option>
        </select>
        <br />
        <span>{errors.category?.message}</span>
        <br />
        <label htmlFor="amount">Amount</label>
        <br />
        <input type="number" defaultValue={defaultValuesObj.amount} {...register("amount")} name="amount" placeholder="amount" min="1" />
        <br />
        <span>{errors.amount?.message}</span>
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input type="number" defaultValue={defaultValuesObj.price} {...register("price")} name="price" placeholder="price" />
        <br />
        <span>{errors.price?.message}</span>
        <br />
        <label htmlFor="startDate">Start date</label>
        <br />
        <input type="date" defaultValue={defaultValuesObj.startDate?.toString()} {...register("startDate")} name="startDate" placeholder="startDate" />
        <br />
        <span>{errors.startDate?.message}</span>
        <br />
        <label htmlFor="endDate">End date</label>
        <input type="date" defaultValue={defaultValuesObj.endDate?.toString()} {...register("endDate")} name="endDate" placeholder="endDate" />
        <br />
        <span>{errors.endDate?.message}</span>
        <br />
        <label htmlFor="image">Image</label>
        <br/>
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
        <button disabled={!isDirty} className="button-app">Update</button>
      </form>
    </div>
  );
}

export default EditCoupon;
