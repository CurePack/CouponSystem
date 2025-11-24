import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AddCompany.css";
import { CompanyModel } from "../../../Models/CompanyModel";
import { useForm } from "react-hook-form";
import { addCompany } from "../../../WebApi/AdminApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import store from "../../../Redux/store";
import { companyAddedAction } from "../../../Redux/CompaniesAppState";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Company Name is required")
      .typeError("You must decide for a new company name!"),
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
  } = useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) as any });

  const sendToRemote = async (company: CompanyModel) => {
    await addCompany(company)
      .then((res) => {
        notify.success(SccMsg.ADDED_COMPANY);
        // Updating global state
        store.dispatch(companyAddedAction(res.data));
        navigate("/admin/companies");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <div className="AddCompany">
      <h2>Let's add a company, shall we?</h2>
      <form onSubmit={handleSubmit(sendToRemote)}>
        <label htmlFor="name">company name</label>
        <br />
        <input type="text" {...register("name")} name="name" placeholder="name"/>
        <br />
        <span>{errors.name?.message}</span>
        <br />
        <label htmlFor="image">image</label>
        <br />
        <select {...register("image")} name="image">
          <option selected disabled={true}>Choose image</option>
          <option value="isengard.jpg">isengard.jpg</option>
          <option value="minastirith.jpg">minastirith.jpg</option>
          <option value="mordorEye1.jpg">mordorEye1.jpg</option>
          <option value="saruman.jpg">saruman.jpg</option>
          <option value="sauron.jpg">sauron.jpg</option>
          <option value="treebeard.jpg">treebeard.jpg</option>
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
        <span>Please note, that your password is auto generated to be: [1234]</span>
        <br />
        <button className="button-app">Lets go!</button>
      </form>
    </div>
  );
}

export default AddCompany;
