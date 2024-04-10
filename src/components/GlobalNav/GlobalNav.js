import logo from "../../assets/icons/logoteal.svg";
import "../Nav/Nav.scss";
import { Link } from "react-router-dom";

export default function GlobalNav() {
  return (
    <nav className="nav nav--global">
      <div className="nav__container ">
        <Link to="/home" className="nav__watermark">
          <img className="nav__logo" src={logo} alt="brainflix logo" />
        </Link>
      </div>
    </nav>
  );
}
