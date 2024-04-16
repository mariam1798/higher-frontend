import React from "react";
import "./UserProfile.scss";

export default function UserProfile({ avatar, user }) {
  return (
    <section className="profile">
      <div className="profile__avatar">
        <img src={avatar} alt="" className="profile__icon" />
      </div>
      <div className="profile__details">
        <h3 className="profile__name">{user.name}</h3>
        <h4 className="profile__text">
          Job field : <span className="profile__span">{user.job_title}</span>
        </h4>
        <h4 className="profile__text">
          Professional status :
          <span className="profile__span"> {user.professional_status}</span>
        </h4>
        <h4 className="profile__text">
          Location :<span className="profile__span"> {user.location}</span>{" "}
        </h4>
      </div>
    </section>
  );
}
