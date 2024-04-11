import React from "react";

export default function UserProfile({ avatar, user }) {
  return (
    <section className="profile">
      <h3 className="profile__name">{user.name}</h3>
      <h4 className="profile__job">{user.job_title}</h4>
      <h4 className="profile__status">{user.professional_status}</h4>
      <h4 className="profile__country">{user.location}</h4>
      <img src={avatar} alt="" className="user__icon" />
    </section>
  );
}
