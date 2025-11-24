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
    .required("client type is required"),
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
    formState: { errors, isDirty, isValid },
  } = useForm<CredentialsModel>({ mode: "all", resolver: yupResolver(schema) as any });

  const onSubmit = async (credentials: CredentialsModel) => {
    await login(credentials)
      .then((res) => {
        notify.success(SccMsg.LOGIN_SUCCESS);
        // Updating global state
        store.dispatch(loginAction(res.data));
        console.log(res.data.clientType);
        notify.success(res.data.clientType);
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
        <select defaultValue="" {...register("clientType")} name="clientType">
          <option value="" disabled>
            Choose client type
          </option>
          <option value="CUSTOMER">Customer</option>
          <option value="COMPANY">Company</option>
          <option value="ADMINISTRATOR">Admin</option>
        </select>
        <br />
        <label htmlFor="email">email</label>
        <br />
        <input
          type="email"
          {...register("email")}
          name="email"
          placeholder="email"
        />
        <br />
        <span>{errors.email?.message}</span>
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input
          type="password"
          {...register("password")}
          name="password"
          placeholder="password"
        />
        <br />
        <span>{errors.password?.message}</span>
        <br />
        <button className="button-app" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
