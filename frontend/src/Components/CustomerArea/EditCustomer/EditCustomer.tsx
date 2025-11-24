import "./EditCustomer.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import store from "../../../Redux/store";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCustomer } from "../../../WebApi/AdminApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { customerUpdatedAction } from "../../../Redux/CustomersAppState";

function EditCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");
    const [customer, setCustomer] = useState<CustomerModel>(store.getState().customerReducer.customers.filter((customer) => customer.id === id)[0]);

    useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const schema = yup.object().shape({
    firstName: yup.string()
        .required("First name is required"),
    lastName: yup.string()
        .required("Last name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Invalid email address"),
  });

  let defaultValuesObj = {...customer}

  const {
      register,
      handleSubmit,
      control,
      formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) as any });

  const { dirtyFields } = useFormState ({
      control
  })

  const sendToRemote = async (customer: CustomerModel) => {
      await updateCustomer(id, customer)
        .then((res) => {
            notify.success(SccMsg.UPDATED_CUSTOMER);
            store.dispatch(customerUpdatedAction(res.data));
            navigate("/admin/customers");
        })
        .catch((err) => {
            notify.error(err);
            console.log(err);
            console.log(err.message);
        });
  };

  return (
    <div className="EditCustomer">
        <h2>So you want to edit this... ok.</h2>
        <form onSubmit={handleSubmit(sendToRemote)}>
            <label htmlFor="firstName">first name</label>
            <br/>
            <input type="text" defaultValue={customer?.firstName} {...register("firstName")} name="firstName" placeholder="firstName"/>
            <br/>
            <span>{errors.firstName?.message}</span>
            <br/>
            <label htmlFor="lastName">last name</label>
            <br/>
            <input type="text" defaultValue={customer?.lastName} {...register("lastName")} name="lastName" placeholder="lastName"/>
            <br/>
            <span>{errors.lastName?.message}</span>
            <br/>
            <label htmlFor="email">email</label>
            <br/>
            <input type="email" defaultValue={customer?.lastName} {...register("email")} name="email" placeholder="email"/>
            <br/>
            <span>{errors.email?.message}</span>
            <br/>
            <button className="button-app" disabled={!isValid}>Update</button>
        </form>


    </div>
  );
}

export default EditCustomer;
