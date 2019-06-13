import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";

const ProfileEdu = ({ profile }) => {

  return (
    <>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education && profile.education.map(edu => (

          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p><Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
              {edu.to === null ? (
                ' Now'
              ) : (
                <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
              )}</p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
            {edu.description && (<p>
              <strong>Description: </strong>{edu.description}
            </p>)}
          </div>
        ))}
      </div>
    </>

  );
};

ProfileEdu.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEdu;