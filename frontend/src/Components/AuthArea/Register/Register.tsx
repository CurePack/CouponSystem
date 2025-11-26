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
                .required("Choose your banner"),
        password:
            yup.string()
                .min(4, 'Your password is too short.')
                .required("password is required"),
        confirm:
            yup.string()
                .required("Confirm your password")
                .oneOf([yup.ref('password'), null], 'Passwords must match'),

    });

    const { register, handleSubmit, setValue, watch, formState: { errors, isDirty, isValid } } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) as any });
    const watchedType = watch("clientType");


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
                <input type="email" {...register("email")} name="email" placeholder="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="password">password</label>
                <input type="password" {...register("password")} name="password" placeholder="password" />
                <span>{errors.password?.message}</span>
                <label htmlFor="confirm">confirm password</label>
                <input type="password" {...register("confirm")} name="confirm" placeholder="confirm" />
                <span>{errors.confirm?.message}</span>
                <button className="button-app" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default Register;
