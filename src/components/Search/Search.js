import "./Search.scss";
import { useNavigate } from "react-router-dom";
import user from "../../assets/icons/user.svg";

export default function Search() {
  const navigate = useNavigate();

  return (
    <section className="search">
      <div className="search__container">
        <div className="search__top">
          <input
            className="search__bar"
            placeholder="Search"
            name="search"
          ></input>
        </div>
        <button
          onClick={() => {
            navigate("/upload");
          }}
          className="search__button"
        >
          UPLOAD
        </button>
        <img
          src={user}
          alt="user image"
          className="search__avatar search__avatar--tablet"
        />
      </div>
    </section>
  );
}
