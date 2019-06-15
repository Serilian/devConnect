import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById,match.params.id]);


  return (
    <>
      {profile === null || loading ? (<Spinner/>) :
        <>
          <Link to={"/profiles"} className="btn btn-light">Back To Profiles</Link>

          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id ? (
            <Link to={"/edit-profile"} className={"btn btn-dark"}>Edit Profile</Link>) : (null)}

          <ProfileTop profile={profile}/>

          <ProfileAbout profile={profile}/>

          {profile.experience.length > 0 && <ProfileExp profile={profile}/>}

          {profile.education.length > 0 && <ProfileEdu profile={profile}/>}

          {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}
        </>
      }
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer
});

export default connect(mapStateToProps, { getProfileById })(Profile);