import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import moment from "moment";


const Comment = ({ auth,
                   postId,
                   comment: { _id, text, name, avatar, user, date },
                   deleteComment
                 }) => {


  return (
    <div className="comment">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profiles/${user._id}`}>
            <img
              className="round-img"
              src={avatar}
              alt={name}/>
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
          <p className="post-date">
            Posted on <Moment format={"YYYY/MM/DD"}>{moment.utc(date)}</Moment>
          </p>
          {!auth.loading && user === auth.user._id &&
          (<button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteComment(postId, _id);
            }}
          >
            <i className="fas fa-times"></i>
          </button>)
          }
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, { deleteComment })(Comment);
