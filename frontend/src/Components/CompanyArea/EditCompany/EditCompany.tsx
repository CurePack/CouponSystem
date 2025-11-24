import "./EditCompany.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import store from "../../../Redux/store";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCompany } from "../../../WebApi/AdminApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";

function EditCompany(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");
    const [company, setCompany] = useState<CompanyModel>(store.getState().companyReducer.companies.filter(company => company.id === id)[0]);



    useEffect(() => {
    // If we don't have a user object - we are not logged in
    if (!store.getState().authState.user.token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate('/login');
    }
},[])

  const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string()
        .required("Email is required")
        .email("Invalid email address"),
  });

  let defaultValuesObj = {...company}

  const {
      register,
      handleSubmit,
      control,
      formState: { errors, isDirty, isValid },
  } = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) as any });

  const { dirtyFields } = useFormState ({
      control
  });

  const sendToRemote = async (company: CompanyModel) => {
      await updateCompany(id, company)
        .then((res) => {
            notify.success(SccMsg.UPDATED_COMPANY);
            store.dispatch(companyUpdatedAction(res.data));
            navigate("/admin/companies");
        })
        .catch((err) => {
            notify.error(err);
            console.log(err);
            console.log(err.message);
        });
  };

  return (
    <div className="EditCompany">
        <h2>So you want to edit this... ok.</h2>
        <form onSubmit={handleSubmit(sendToRemote)}>
            <label htmlFor="name">name</label>
            <br/>
            <input type="text" defaultValue={company?.name} {...register("name")} name="name" placeholder="name"/>
            <br/>
            <span>{errors.name?.message}</span>
            <br/>
            <label htmlFor="email">email</label>
            <br/>
            <input type="email" defaultValue={company?.email} {...register("email")} name="email" placeholder="email"/>
            <br/>
            <span>{errors.email?.message}</span>
            <br/>
            <button className="button-app" disabled={!isValid}>Update</button>
        </form>
    </div>
  );
}

export default EditCompany;
