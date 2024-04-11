import "./DropDown.scss";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg";
import { useState } from "react";

export default function DropDown({ failedAuth, handleLogout }) {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownClick = () => setIsVisible(!isVisible);

  return (
    <section className="dropdown">
      <img
        onClick={dropdownClick}
        src={userIcon}
        alt="user image"
        className="dropdown__avatar "
      />
      {isVisible && (
        <section className="dropdown__label">
          <ul className="dropdown__list">
            {failedAuth ? (
              <>
                <Link to="/login" className="dropdown__navigate">
                  <li className="dropdown__item dropdown__item--bottom">
                    Log In
                  </li>
                </Link>
                <Link to="/" className="dropdown__navigate">
                  <li className="dropdown__item ">Register</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user" className="dropdown__navigate">
                  <li className="dropdown__item ">Profile</li>
                </Link>
                <li onClick={handleLogout} className="dropdown__item">
                  Log Out
                </li>
              </>
            )}
          </ul>
        </section>
      )}
    </section>
  );
}
