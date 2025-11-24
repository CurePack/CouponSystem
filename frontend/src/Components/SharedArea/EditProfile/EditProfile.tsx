import { useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import notify from "../../../Services/Notifications";
import "./EditProfile.css";

function EditProfile(): JSX.Element {
    const [user, setUser] = useState<UserModel>(store.getState().authState.user);
    const id = user.id;
    const [customer, setCustomer] = useState<CustomerModel>(store.getState().customerReducer.customers.filter((customer) => customer.id === id)[0]);
    notify.success("Customer number " + id);
    return (
        <div className="EditProfile">
			
        </div>
    );
}

export default EditProfile;
