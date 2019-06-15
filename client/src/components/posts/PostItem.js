import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { addLike, removeLike, deletePost } from "../../actions/post";


const PostItem = ({ post, auth, addLike, removeLike, deletePost, showActions }) => {
  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src={post.avatar}
              alt={post.name}
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {post.text}
          </p>
          <p className="post-date">
            Posted on <Moment format={"YYYY/MM/DD"}>{moment.utc(post.date)}</Moment>
          </p>
          {showActions &&
          <>
            <button type={"button"} className="btn btn-light" onClick={() => addLike(post._id)}>
              <i className={"fas fa-thumbs-up"}/>
              {post.likes.length > 0 &&
              <span>{" "}{post.likes.length}</span>}
            </button>
            <button type={"button"} className="btn btn-light" onClick={() => removeLike(post._id)}>
              <i className={"fas fa-thumbs-down"}/>
            </button>
            <Link to={`/posts/${post._id}`} className={"btn btn-primary"}>
              Discussion {post.comments.length > 0 && <span className={"comment-count"}>{post.comments.length}</span>}
            </Link>
            {!auth.loading && post.user === auth.user._id &&
            (<button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              <i className="fas fa-times"></i>
            </button>)
            }
            </>}
        </div>
      </div>
    </>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);