import React from "react";
import "./UserProfile.scss";

export default function UserProfile({ avatar, user }) {
  return (
    <section className="profile">
      <div className="profiled__details">
        <h3 className="profile__name">{user.name}</h3>
        <h4 className="profile__text">{user.job_title}</h4>
        <h4 className="profile__text">{user.professional_status}</h4>
        <h4 className="profile__text">{user.location}</h4>
      </div>
      <div className="profile__avatar">
        <img src={avatar} alt="" className="profile__icon" />
      </div>
    </section>
  );
}
