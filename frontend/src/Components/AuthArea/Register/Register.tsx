import "./Register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import notify, { SccMsg } from "../../../Services/Notifications";
import { registerRequest } from "../../../WebApi/UsersApi";
import store from "../../../Redux/store";
import { registerAction } from "../../../Redux/AuthAppState";
import { RegisterModel } from "../../../Models/RegisterModel";
function Register(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .required("Email is required")
                .email("Invalid email address"),
        clientType:
            yup.string()
                .required("Client type is required"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("password is required"),
        confirm:
            yup.string()
                .required("Confirm your password")
                .oneOf([yup.ref('password'), null], 'Passwords must match'),

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) as any });


    const onSubmit = async (registerModel: RegisterModel) => {
        let credentials = new CredentialsModel(registerModel.email,registerModel.password, registerModel.clientType);
        await registerRequest(credentials)
            .then(res => {
                notify.success(SccMsg.REGISTER_SUCCESS);
                // Updating global state
                store.dispatch(registerAction());
                navigate('/login');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log();
                console.log(err.message);
            });
    }

    return (
        <div className="Register">
			<h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="clientType">client type</label>
                <br />
                <select defaultValue="" {...register("clientType")} name="clientType">
                    <option value="" disabled>Choose client type</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="COMPANY">Company</option>
                    <option value="ADMINISTRATOR">Admin</option>
                </select>
                <br />
                <span>{errors.clientType?.message}</span>
                <br />
                <label htmlFor="email">email</label>
                <br />
                <input type="email" {...register("email")} name="email" placeholder="email" />
                <br />
                <span>{errors.email?.message}</span>
                <br />
                <label htmlFor="password">password</label>
                <br />
                <input type="password" {...register("password")} name="password" placeholder="password" />
                <br />
                <span>{errors.password?.message}</span>
                <br />
                <label htmlFor="confirm">confirm password</label>
                <br />
                <input type="password" {...register("confirm")} name="confirm" placeholder="confirm" />
                <br />
                <span>{errors.confirm?.message}</span>
                <br />
                <button className="button-app" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default Register;
