import "./Home.css";
import image from "../../../Assets/Images/mainBackground.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";

import FrodoImg from "../../../Assets/Images/Profile/Customer/frodo1.jpg";
import SamImg from "../../../Assets/Images/Profile/Customer/sam.jpg";
import GollumImg from "../../../Assets/Images/Profile/Customer/gollum2.jpg";
import SarumanImg from "../../../Assets/Images/Profile/Company/saruman.jpg";
import TreebeardImg from "../../../Assets/Images/Profile/Company/treebeard.jpg";
import SauronImg from "../../../Assets/Images/Profile/Company/sauron.jpg";

const demoLogins = [
  { name: "Saruman", email: "saruman@gmail.com", password: "1234", role: "Company", image: SarumanImg },
  { name: "Frodo", email: "frodobaggins@gmail.com", password: "1234", role: "Customer", image: FrodoImg },
  { name: "Gollum", email: "gollum@gmail.com", password: "1234", role: "Customer", image: GollumImg },
  { name: "Sauron", email: "sauron@gmail.com", password: "1234", role: "Company", image: SauronImg },
];

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>(store.getState().authState.user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setUser(store.getState().authState.user));
    return unsubscribe;
  }, []);

  const isLoggedIn = Boolean(user?.token);

  return (
    <div className="Home" style={{ backgroundImage: `url(${image})` }}>
      <div className="home-overlay glass">
        <div className="home-hero">
          <div className="hero-content">
            <p className="eyebrow">Welcome to Middle-earth’s marketplace</p>
            <h1>Where coupons are forged and fortunes are found</h1>
            {isLoggedIn ? (
              <p className="muted">You are already in the fellowship, {user?.email || "traveler"}. Explore the coupons, or visit your profile.</p>
            ) : (
              <p className="muted">
                Traveller, choose your path: sign in with your true name, or take up the mantle of a known hero.
              </p>
            )}
            <div className="home-actions">
              {!isLoggedIn && (
                <>
                  <Link className="button-app hero-btn" to="/login">Log in</Link>
                  <Link className="button-app-default hero-btn" to="/register">Register</Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link className="button-app hero-btn" to="/public/coupons">Browse coupons</Link>
                  <Link className="button-app-default hero-btn" to="/profile">View profile</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="home-demos card">
            <p className="eyebrow">Try a famed name</p>
            <div className="demo-grid">
              {demoLogins.map((c) => (
                <div key={c.email} className="demo-card">
                  <div className="demo-avatar-large">
                    <img src={c.image} alt={c.name} />
                    <span className="demo-badge">{c.role}</span>
                  </div>
                  <div className="demo-meta">
                    <p className="eyebrow">{c.name}</p>
                    <p className="demo-email">{c.email}</p>
                    <p className="muted">Pw: {c.password}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="home-rules-bottom">
          <div className="pill">Companies forge coupons, but cannot purchase them.</div>
          <div className="pill">Customers quest for coupons and may redeem them, but cannot forge their own.</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
