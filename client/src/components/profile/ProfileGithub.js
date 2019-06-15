import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, profile: { repos, loading } }) => {

  useEffect(() => {

    getGithubRepos(username);

  }, [getGithubRepos, username]);


  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {loading && repos === null ? <Spinner/> : repos.map(repo =>
          (<div className="repo bg-white p-1 my-1" key={repo.id}>
            <div>
              <h4><a href={repo.html_url} target="_blank"
                     rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                <li className="badge badge-light">Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>))
        }
      </div>
    </>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);