import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import PostForm from "../posts/PostForm";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Post = ({ getPost, post, match }) => {

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <>
      {post.loading || post.post === null ? <Spinner/> :
        <>
        <Link to={'/posts'} className={'btn btn-dark'}>Back to posts</Link>
        <PostItem post={post.post} showActions={false}/>
        <PostForm placeholder={"Leave a comment"} post={false}/>
        <div className={"comments"}>
          {post.post.comments.map(comment=>(<Comment comment={comment} key={comment._id} postId={post.post._id}/>)
          )}
        </div>

        </>
      }
    </>
  )
    ;
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  post: state.postReducer
});

export default connect(mapStateToProps, { getPost })(Post);