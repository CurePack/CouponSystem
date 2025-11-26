import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { login } from "../../../WebApi/UsersApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import store from "../../../Redux/store";
import { loginAction } from "../../../Redux/AuthAppState";
function Login(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    clientType: yup
      .string()
      .required("Choose your banner, traveler."),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .min(4, "Your password is too short.")
      .required("password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<CredentialsModel>({ mode: "all", resolver: yupResolver(schema) as any });

  const watchedType = watch("clientType");

  const onSubmit = async (credentials: CredentialsModel) => {
    await login(credentials)
      .then((res) => {
        notify.success(SccMsg.LOGIN_SUCCESS);
        // Updating global state
        store.dispatch(loginAction(res.data));
        navigate("/home");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err.message);
      });
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("clientType")} value={watchedType || ""} />
        <div className="client-type-group">
          <p className="eyebrow">Choose your banner</p>
          <div className="client-type-buttons">
            {[
              { key: "CUSTOMER", label: "Customer" },
              { key: "COMPANY", label: "Company" },
              { key: "ADMINISTRATOR", label: "Admin" },
            ].map((item) => (
              <button
                type="button"
                key={item.key}
                className={`chip ${watchedType === item.key ? "active" : ""}`}
                onClick={() => setValue("clientType", item.key, { shouldValidate: true })}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span>{errors.clientType?.message}</span>
        </div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          {...register("email")}
          name="email"
          placeholder="email"
        />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">password</label>
        <input
          type="password"
          {...register("password")}
          name="password"
          placeholder="password"
        />
        <span>{errors.password?.message}</span>
        <button className="button-app" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
