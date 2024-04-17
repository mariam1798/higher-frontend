import logo from "../../assets/icons/high.svg";
import higher from "../../assets/icons/higher.svg";
import "./Nav.scss";
import NavSide from "../NavSide/NavSide";
import { Link } from "react-router-dom";
import ImageMotion from "../../Motion/ImageMotion";

export default function Nav({ failedAuth, handleLogout }) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/home" className="nav__watermark">
          <ImageMotion src={logo} className="nav__logo" />
          <ImageMotion src={higher} className="nav__logo--tablet" />
        </Link>
        <NavSide failedAuth={failedAuth} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
