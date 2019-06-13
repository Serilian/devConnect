import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";

const ProfileExp = ({ profile }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>

      {profile.experience && profile.experience.map(exp => (
        <div key={exp._id}>
          <h3 className="text-dark">{exp.company}</h3>
          <p><Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{" "}
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
            )}</p>
          <p><strong>Position: </strong>{exp.status}</p>
          {exp.description && (<p>
            <strong>Description: </strong>{exp.description}
          </p>)}
        </div>
      ))}
    </div>
  );
};

ProfileExp.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExp;