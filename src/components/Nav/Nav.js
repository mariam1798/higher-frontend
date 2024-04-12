import logo from "../../assets/icons/high.svg";
import higher from "../../assets/icons/higher.svg";
import "./Nav.scss";
import NavSide from "../NavSide/NavSide";
import { Link } from "react-router-dom";

export default function Nav({ failedAuth, handleLogout }) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/home" className="nav__watermark">
          <img className="nav__logo" src={logo} alt="brainflix logo" />
          <img
            className="nav__logo--tablet"
            src={higher}
            alt="brainflix logo"
          />
        </Link>
        <NavSide failedAuth={failedAuth} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
