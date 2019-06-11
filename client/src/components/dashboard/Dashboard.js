import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

const Dashboard = ({ auth: { user, isAuthenticated }, getCurrentProfile, profile: { profile, loading } }) => {

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (loading && profile === null) ?
    <Spinner/> :
    <>
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

      {profile !== null ?
        <>
          <DashboardActions/>
        </> :
        <>
          <p>
            You have not yet created a profile, please add some info
          </p>
          <Link to={"/create-profile"} className={"btn btn-primary my-1"}> Create Profile</Link>
        </>}

      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Tech Guy Web Solutions</td>
          <td className="hide-sm">Senior Developer</td>
          <td className="hide-sm">
            02-03-2009 - 01-02-2014
          </td>
          <td>
            <button className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td>Traversy Media</td>
          <td className="hide-sm">Instructor & Developer</td>
          <td className="hide-sm">
            02-03-2015 - Now
          </td>
          <td>
            <button className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
        <tr>
          <th>School</th>
          <th className="hide-sm">Degree</th>
          <th className="hide-sm">Years</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Northern Essex</td>
          <td className="hide-sm">Associates</td>
          <td className="hide-sm">
            02-03-2007 - 01-02-2009
          </td>
          <td>
            <button className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>

          Delete My Account
        </button>
      </div>
    </>;
};


Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  profile: state.profileReducer
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);