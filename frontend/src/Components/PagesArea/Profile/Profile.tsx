import { useEffect, useMemo, useState } from "react";
import "./Profile.css";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import SarumanImg from "../../../Assets/Images/Profile/Company/saruman.jpg";
import SauronImg from "../../../Assets/Images/Profile/Company/sauron.jpg";
import TreebeardImg from "../../../Assets/Images/Profile/Company/treebeard.jpg";
import AdminImg from "../../../Assets/Images/Profile/Admin/admin1.jpg";
import FrodoImg from "../../../Assets/Images/Profile/Customer/frodo1.jpg";
import DefaultImg from "../../../Assets/Images/Profile/default.jpg";
import { Link } from "react-router-dom";

function Profile(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });
    return unsubscribe;
  }, []);

  const avatar = useMemo(() => {
    const handle = (user?.email || "").split("@")[0]?.toLowerCase();
    const explicitMap: Record<string, string> = {
      saruman: SarumanImg,
      sauron: SauronImg,
      treebeard: TreebeardImg,
      admin: AdminImg,
    };
    if (handle && explicitMap[handle]) return explicitMap[handle];
    switch (user?.clientType) {
      case "ADMINISTRATOR":
        return AdminImg;
      case "COMPANY":
        return TreebeardImg;
      case "CUSTOMER":
        return FrodoImg;
      default:
        return DefaultImg;
    }
  }, [user]);

  const initials = (user?.email || "LO").slice(0, 2).toUpperCase();

  return (
    <div className="Profile">
      <div className="profile-hero card">
        <div className="profile-identity">
          <div className="avatar">
            <img src={avatar} alt="Profile" />
            <span className="badge">{user?.clientType || "GUEST"}</span>
          </div>
          <div>
            <p className="eyebrow">Account</p>
            <h2>{user?.email || "Traveler of Middle-earth"}</h2>
            <p className="muted">ID: {user?.id || "—"}</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card stat">
          <p className="eyebrow">Role</p>
          <h3>{user?.clientType || "Guest"}</h3>
          <p className="muted">
            Tailored menus, routes, and capabilities reflect your realm.
          </p>
        </div>
        <div className="card stat">
          <p className="eyebrow">Email</p>
          <h3>{user?.email || "Not logged in"}</h3>
          <p className="muted">Used for auth and personalization.</p>
        </div>
        <div className="card stat">
          <p className="eyebrow">Avatar</p>
          <h3>{user?.clientType === "COMPANY" ? "House Banner" : "Portrait"}</h3>
          <p className="muted">Currently showing {user?.clientType === "COMPANY" ? "company" : "personal"} image.</p>
        </div>
      </div>

      <div className="card profile-note">
        <h4>Legend</h4>
        <ul>
          <li>Saruman, Sauron, and Treebeard emails get custom banners.</li>
          <li>Company accounts default to Treebeard; customers to Frodo; admins to the White Tower.</li>
          <li>Swap your login to see the avatar adapt instantly.</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
