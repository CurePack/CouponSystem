import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomerModel } from "../../../Models/CustomerModel";
import "./AddCustomer.css";
import { addCustomer } from "../../../WebApi/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import store from "../../../Redux/store";
import { customerAddedAction } from "../../../Redux/CustomersAppState";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .typeError("Must specify first name!"),
    lastName: yup
      .string()
      .required("Last name is required")
      .typeError("Must specify last name!"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    image: yup.string().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) as any });

  const sendToRemote = async (customer: CustomerModel) => {
    await addCustomer(customer)
      .then((res) => {
        notify.success(SccMsg.ADDED_CUSTOMER);
        // Updating global state
        store.dispatch(customerAddedAction(res.data));
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <div className="AddCustomer">
      <h2>Let's add a customer, shall we?</h2>
      <form onSubmit={handleSubmit(sendToRemote)}>
        <label htmlFor="firstName">first name</label>
        <br />
        <input type="text" {...register("firstName")} name="firstName" placeholder="firstName"/>
        <br />
        <span>{errors.firstName?.message}</span>
        <br />
        <label htmlFor="lastName">last name</label>
        <br />
        <input type="text" {...register("lastName")} name="lastName" placeholder="lastName"/>
        <br />
        <span>{errors.lastName?.message}</span>
        <br />
        <label htmlFor="image">image</label>
        <br />
        <select {...register("image")} name="image">
          <option selected disabled={true}>Choose image</option>
          <option value="aragorn1.jpg">aragorn1.jpg</option>
          <option value="frodo1.jpg">frodo1.jpg</option>
          <option value="frodo2.jpg">frodo2.jpg</option>
          <option value="gandalf1.jpg">gandalf1.jpg</option>
          <option value="gimli1.jpg">gimli1.jpg</option>
          <option value="gollum1.jpg">gollum1.jpg</option>
          <option value="gollum2.jpg">gollum2.jpg</option>
          <option value="legolas1.jpg">legolas1.jpg</option>
          <option value="pippin.jpg">pippin.jpg</option>
          <option value="sam.jpg">sam.jpg</option>
        </select>
        <br />
        <span>{errors.image?.message}</span>
        <br />
        <label htmlFor="email">email</label>
        <br />
        <input type="email" {...register("email")} name="email" placeholder="email"/>
        <br />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        <span>Please note, that your password is auto generated to be: [1234]</span>
        <br />
        <button className="button-app">Add</button>
      </form>
    </div>
  );
}

export default AddCustomer;
