import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({ profile }) => {
  return (
    <div className="profile-grid my-1">
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={profile.user.avatar}
          alt={profile.user.name}
        />
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.status} at {profile.company}</p>
        <p>{profile.location}</p>
        {profile.website ? (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>) : null}
        <div className="icons my-1">
          {profile.social && profile.social.facebook ? (
            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>) : null}
          {profile.social && profile.social.twitter ? (
            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>) : null}
          {profile.social && profile.social.linkedin ? (
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>) : null}
          {profile.social && profile.social.youtube ? (
            <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>) : null}
          {profile.social && profile.social.instagram ? (
            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>) : null}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;