import logo from "../../assets/icons/logoteal.svg";
import "./Nav.scss";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

export default function Nav({ setVideos, id }) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/home" className="nav__watermark">
          <img className="nav__logo" src={logo} alt="brainflix logo" />
        </Link>
        <Search setVideos={setVideos} id={id} />
      </div>
    </nav>
  );
}
