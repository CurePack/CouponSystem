import { Outlet } from "react-router-dom";
import Routing from "../../SharedArea/Routing/Routing";
import CouponList from "../../CouponArea/CouponList/CouponList";
import image from "../../../Assets/Images/admin1.jpg";
import "./Main.css";
import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";

function Main(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authState.user);
    const [str, setStr] = useState<string>("image");




    useEffect(() => {
        return store.subscribe(() => {
          setUser(store.getState().authState.user)
        });
      }, []);

    return (
        <div className="Main" >
			<Routing/>
            <Outlet/>
        </div>
    );
}

export default Main;
