import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ProfileItem = ({profile:
  {user:
    {_id, name, avatar},
    status,
    company,
    location,
    skills
  }}) => {
  return (
        <div className="profile bg-light my-1">
          <img
            className="round-img"
            src={avatar}
            alt={name}
          />
          <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>at {company}</span>}</p>
            <p className={"my-1"}>{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
          </div>

          <ul>
              {skills.slice(0,4).map((skill, index)=> (
                <li className="text-primary" key={index} >
                  <i className="fas fa-check"></i> {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </li>
                )
              )}
          </ul>
        </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,

};

export default ProfileItem;