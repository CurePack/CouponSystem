import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>(store.getState().authState.user);

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState?.user || new UserModel());
        });

        return unsubscribe;
    }, []);
    return (
        <div className="AuthMenu">
            {user?.token ? (
                <>
                    <span>{user?.email}</span>
                    <Link to="/profile" className="reg">Profile</Link>
                    <Link to="/logout" className="out">Logout</Link>
                </>
            ) : (
                <>
                    <span>Welcome, traveller</span>
                    <Link to="/register" className="reg">Register</Link>
                    <Link to="/login" className="log">Login</Link>
                </>
            )}
        </div>
    );
}

export default AuthMenu;
