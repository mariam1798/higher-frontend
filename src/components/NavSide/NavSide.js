import { Link } from "react-router-dom";
import "./NavSide.scss";
import DropDown from "../DropDown/DropDown";
import home from "../../assets/icons/home.svg";
import job from "../../assets/icons/work.svg";
import ImageMotion from "../../Motion/ImageMotion";

export default function NavSide() {
  return (
    <section className="side">
      <div className="side__container">
        <div className="side__nav">
          <Link className="side__job" to="/jobs">
            <ImageMotion alt="jobs logo" src={job} className="side__logo" />
          </Link>
          <Link className="side__home" to="/home">
            <ImageMotion alt="home logo" src={home} className="side__logo" />
          </Link>
        </div>

        <DropDown />
      </div>
    </section>
  );
}
