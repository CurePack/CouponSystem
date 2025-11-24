import "./DeleteCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { customerDeletedAction } from "../../../Redux/CustomersAppState";
import { ImCheckmark, ImCross } from "react-icons/im";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { deleteCustomer } from "../../../WebApi/AdminApi";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useEffect, useState } from "react";
import CustomerCard from "../CustomerCard/CustomerCard";

function DeleteCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");
    const [customer, setCustomer] = useState<CustomerModel>(store.getState().customerReducer.customers.filter(customer => customer.id === id)[0]);
  
    useEffect(() => {
      // If we don't have a user object - we are not logged in
      if (!store.getState().authState.user.token) {
          notify.error(ErrMsg.PLS_LOGIN);
          navigate('/login');
      }
  },[])
    const yes = () => {
      deleteCustomer(id)
        .then((any) => {
          notify.success(SccMsg.DELETED_CUSTOMER);
          store.dispatch(customerDeletedAction(id));
          navigate("/admin/customers");
        })
        .catch((err) => notify.error(err));
    };
  
    const no = () => {
      navigate("/admin/customers")
    };
  
    return (
      <div className="DeleteCustomer">
        <div className="box">
          <h2>Delete Customer</h2>
          <p>Are you sure you want to delete this, my precious?</p>
          <CustomerCard key={customer.id} customer={customer} listType={"single.customer"} />
          <span>
          <ImCross className="cross"size={42} onClick={no}/>
          <ImCheckmark className="check" size={50} onClick={yes}/>
          </span>
        </div>
      </div>
    );
  }

export default DeleteCustomer;
