import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { CustomerModel } from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";
import { customersClearAction, customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notifications";
import { getCustomers } from "../../../WebApi/AdminApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./CustomerList.css";

function CustomerList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customerReducer.customers
  );


  //Side effect goes here
  useEffect(() => {
    if (customers?.length === 0) {
      getCustomers()
      .then((res) => {
        //Update component state
        setCustomers(res.data);
        //Update app state
        store.dispatch(customersDownloadedAction(res.data));
        notify.success(SccMsg.GOT_CUSTOMERS);
      })
      .catch((err) => {
        notify.error(err)
      });
    }
  }, []);

  return (
    <div className="CustomerList">
      <h1>Customers:</h1>
      <CustomLink to="add">
        <FaPlusCircle size={42} />
      </CustomLink>
      {customers?.length > 0 ? (
        <div className="container">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} listType={"admin.customers"}/>
          ))}
        </div>
      ) : (
        <EmptyView msg="No customers for you!" />
      )}
    </div>
  );
}

export default CustomerList;
