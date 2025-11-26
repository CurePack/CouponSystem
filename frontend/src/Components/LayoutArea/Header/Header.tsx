import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import DarkMode from "../../SharedArea/DarkMode/DarkMode";
import Logo from "../../SharedArea/Logo/Logo";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="header-left">
        <div className="logo"><Logo /></div>
        <h1>The Lord of the Coupons</h1>
      </div>
      <div className="header-menu">
        <Menu />
      </div>
      <div className="actions">
        <AuthMenu />
      </div>
    </div>
  );
}

export default Header;
