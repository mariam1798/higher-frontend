import "./DropDown.scss";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../UseContext/UseContext";

export default function DropDown() {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { authToken, handleLogout } = useAuth();
  const isAuthenticated = !!authToken;

  const dropdownClick = () => setIsVisible(!isVisible);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section ref={dropdownRef} className="dropdown">
      <img
        onClick={dropdownClick}
        src={userIcon}
        alt="user image"
        className="dropdown__avatar "
      />
      {isVisible && (
        <section className="dropdown__label">
          <ul className="dropdown__list">
            {isAuthenticated ? (
              <>
                <Link to="/user" className="dropdown__navigate">
                  <li className="dropdown__item dropdown__item--bottom">
                    Profile
                  </li>
                </Link>
                <li
                  onClick={handleLogout}
                  className="dropdown__item dropdown__item--top"
                >
                  Log Out
                </li>
              </>
            ) : (
              <>
                <Link to="/login" className="dropdown__navigate">
                  <li className="dropdown__item dropdown__item--bottom">
                    Log In
                  </li>
                </Link>
                <Link to="/" className="dropdown__navigate">
                  <li className="dropdown__item  dropdown__item--top">
                    Register
                  </li>
                </Link>
              </>
            )}
          </ul>
        </section>
      )}
    </section>
  );
}
