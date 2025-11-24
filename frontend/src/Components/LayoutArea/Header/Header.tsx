import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Clock from "../../SharedArea/Clock/Clock";
import DarkMode from "../../SharedArea/DarkMode/DarkMode";
import Logo from "../../SharedArea/Logo/Logo";
import ProfileMenu from "../../SharedArea/ProfileMenu/ProfileMenu";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="logo"><Logo /></div>
      <h1>The Lord of the Coupons</h1>
      <div className="login"><AuthMenu /></div>
      <div className="darkmode"><DarkMode /></div> 
    </div>
  );
}

export default Header;
