import { Link } from "react-router-dom";
import "./NavSide.scss";
import DropDown from "../DropDown/DropDown";
import home from "../../assets/icons/home.svg";
import job from "../../assets/icons/work.svg";

export default function NavSide({ failedAuth, handleLogout }) {
  return (
    <section className="side">
      <div className="side__container">
        <div className="side__nav">
          <Link className="side__icon" to="/jobs">
            <img src={job} alt="" className="side__logo" />
          </Link>
          <Link className="side__home" to="/home">
            <img src={home} alt="" className="side__logo" />
          </Link>
        </div>

        <DropDown failedAuth={failedAuth} handleLogout={handleLogout} />
      </div>
    </section>
  );
}
