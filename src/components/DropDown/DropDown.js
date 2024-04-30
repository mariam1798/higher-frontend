import "./DropDown.scss";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user.svg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/UseAuth";
import ImageMotion from "../../Motion/ImageMotion";
import { motion } from "framer-motion";

export default function DropDown() {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { authToken, handleLogout } = useAuth();
  const isAuthenticated = !!authToken;

  const listItemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

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
      <ImageMotion
        alt="user__logo"
        handleClick={dropdownClick}
        src={userIcon}
        className="dropdown__avatar "
      />
      {isVisible && (
        <section className="dropdown__label">
          <ul className="dropdown__list">
            {isAuthenticated ? (
              <>
                <Link to="/user" className="dropdown__navigate">
                  <motion.li
                    className="dropdown__item dropdown__item--bottom"
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Profile
                  </motion.li>
                </Link>
                <motion.li
                  className="dropdown__item dropdown__item--top"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={handleLogout}
                >
                  Log Out
                </motion.li>
              </>
            ) : (
              <>
                <Link to="/login" className="dropdown__navigate">
                  <motion.li
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="dropdown__item dropdown__item--bottom"
                  >
                    Log In
                  </motion.li>
                </Link>
                <Link to="/" className="dropdown__navigate">
                  <motion.li
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="dropdown__item  dropdown__item--top"
                  >
                    Register
                  </motion.li>
                </Link>
              </>
            )}
          </ul>
        </section>
      )}
    </section>
  );
}
