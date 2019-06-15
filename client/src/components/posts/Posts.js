import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from './PostItem';
import PostForm from "./PostForm";

const Posts = ({ post: { posts, loading }, getPosts }) => {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {loading ? <Spinner/> :
        (<>
          <h1 className="large text-primary">
            Posts
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

          <PostForm placeholder={"Create a post"} post />


          <div className={"posts"}>
            {posts.map(post => (
              <PostItem key={post._id} post={post} showActions={true} />
            ))}
          </div>

        </>)
      }
    </div>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.postReducer
});

export default connect(mapStateToProps, { getPosts })(Posts);