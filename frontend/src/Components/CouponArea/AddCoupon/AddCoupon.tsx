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
import { FaEdit } from "react-icons/fa";

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
    watch,
    setValue,
  } = useForm<CouponModel>({
    mode: "all",
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: "Sample coupon",
      description: "Describe your legendary deal here.",
      category: "ENTERTAINMENT",
      amount: 10,
      price: 49.99,
      startDate: new Date().toISOString().slice(0, 10) as any,
      endDate: new Date().toISOString().slice(0, 10) as any,
      image: "travel.jpg",
    },
  });

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");
  const watchedCategory = watch("category");
  const watchedAmount = watch("amount");
  const watchedPrice = watch("price");
  const watchedEndDate = watch("endDate");
  const watchedImage = watch("image");
  const [showGallery, setShowGallery] = useState(false);

  const preview: CouponModel = {
    id: 0,
    title: watchedTitle || "Sample coupon",
    description: watchedDescription || "Describe your legendary deal here.",
    category: watchedCategory || "ENTERTAINMENT",
    amount: Number(watchedAmount) || 0,
    price: Number(watchedPrice) || 0,
    startDate: new Date(),
    endDate: watchedEndDate ? new Date(watchedEndDate) : new Date(),
    image: watchedImage || "travel.jpg",
  };

  const pic = require("../../../Assets/Images/Coupons/" + preview.image);

  const coverImages = [
    "adventure1.jpg",
    "entertainment1.jpg",
    "entertainment2.jpg",
    "equipment1.jpg",
    "food1.jpg",
    "food2.jpg",
    "hoodies1.jpg",
    "houses1.jpg",
    "houses2.jpg",
    "iwantyouforadventure.jpg",
    "light1.jpg",
    "neutral1.jpg",
    "neutral2.jpg",
    "ring1.jpg",
    "ring2.jpg",
    "theEye1.jpg",
    "travel.jpg",
    "travelErebor.jpg",
    "travelIsengard.jpg",
    "travelMordor.jpg",
    "travelRivendell.jpg",
    "weapons1.jpg",
    "weapons2.jpg",
  ];

  const handleCoverPick = (img: string) => {
    setValue("image", img, { shouldValidate: true, shouldDirty: true });
    setShowGallery(false);
  };

  const sendToRemote = async (coupon: CouponModel) => {
    // ensure auth + startDate default
    if (!user?.token) {
      notify.error(ErrMsg.PLS_LOGIN);
      navigate("/login");
      return;
    }
    if (user?.clientType !== "COMPANY") {
      notify.error("Only company users can add coupons.");
      navigate("/home");
      return;
    }
    coupon.startDate = coupon.startDate ? coupon.startDate : new Date();

    await addCoupon(coupon)
      .then((res) => {
        notify.success(SccMsg.ADDED_COUPON);
        // Updating global state
        store.dispatch(couponAddedAction(res.data));
        navigate("/companies/coupons");
      })
      .catch((err) => {
        notify.error(err);
        if (err?.response?.status === 401) {
          notify.error("Session expired. Please log in again.");
          navigate("/login");
        }
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <div className="AddCoupon">
      <h2>Let's add a coupon, shall we?</h2>
      <form onSubmit={handleSubmit(sendToRemote)} className="add-card-grid">

        <div className="add-preview-card">
          <div className="flip-card no-hover">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={pic} alt={preview.title} />
                <button
                  type="button"
                  className="edit-image-btn"
                  onClick={() => setShowGallery(!showGallery)}
                >
                  <FaEdit /> Choose cover
                </button>
              </div>
            </div>
          </div>
          {showGallery && (
            <div className="cover-gallery">
              {coverImages.map((img) => {
                const thumb = require("../../../Assets/Images/Coupons/" + img);
                const active = img === preview.image;
                return (
                  <button
                    key={img}
                    type="button"
                    className={`cover-thumb ${active ? "active" : ""}`}
                    onClick={() => handleCoverPick(img)}
                  >
                    <img src={thumb} alt={img} />
                    <span>{img}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flip-card edit-card no-hover force-flip">
          <div className="flip-card-inner">
            <div className="flip-card-back edit-card-back">
              <div className="edit-card-header">
                <input className="card-input title" type="text" {...register("title")} name="title" placeholder="Title" />
                <span>{errors.title?.message}</span>
                <input className="card-input desc" type="text" {...register("description")} name="description" placeholder="Description" />
                <span>{errors.description?.message}</span>
              </div>

              <div className="pill-row edit-pill-row">
                <div className="pill editable">
                  <label>Left</label>
                  <input type="number" {...register("amount")} name="amount" min="1" />
                  <span>{errors.amount?.message}</span>
                </div>
                <div className="pill editable price">
                  <label>Price</label>
                  <input type="number" {...register("price")} name="price" step="0.01" min="0" />
                  <span>{errors.price?.message}</span>
                </div>
              </div>

              <div className="dates edit-dates">
                <div>
                  <label>Expiry</label>
                  <input type="date" {...register("endDate")} name="endDate" />
                  <span>{errors.endDate?.message}</span>
                </div>
              </div>

              <div className="category-row">
                <label>Category</label>
                <select {...register("category")} name="category" defaultValue="ENTERTAINMENT">
                  <option value="FOOD">Food</option>
                  <option value="EQUIPMENT">Equipment</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="WEAPONS">Weapons</option>
                  <option value="ENTERTAINMENT">Entertainment</option>
                </select>
                <span>{errors.category?.message}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="add-submit">
          <button className="button-app" type="submit">Submit coupon</button>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
