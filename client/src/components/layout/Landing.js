import React  from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";


const Landing = ({isAuthenticated}) => {

  if(isAuthenticated) {
    return (<Redirect to={'/dashboard'}/>)
  }

  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Net for sonftware engineers Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to={'/register'} className="btn btn-primary">Register</Link>
              <Link to={"/login"} className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Landing.propTypes = {
 isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Landing);