import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { countCoupons } from "../../../WebApi/CompaniesApi";
import notify from "../../../Services/Notifications";
import "./Total.css";

function Total(): JSX.Element {
  const [count, setCount] = useState<number>(
    store.getState().couponReducer.coupons.length
  );

  useEffect(() => {
    if (count === 0) {
      countCoupons()
        .then((res) => setCount(res.data))
        .catch((err) => notify.error(err));
    }
  }, []);

  useEffect(() => {
    return store.subscribe(() => {
      setCount(store.getState().couponReducer.coupons.length);
    });
  }, []);

  return (
    <div className="Total">
      <span>{count}</span>
    </div>
  );
}

export default Total;
