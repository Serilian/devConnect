import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost, addComment} from "../../actions/post";

const PostForm = ({ addPost, placeholder, post, addComment, postState}) => {

  const [text, setText] = useState('');


  const onSubmit = (e)=> {
    e.preventDefault();
    console.log(postState);
    post ? addPost(text) : addComment(postState.post._id, text);
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say something</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder={placeholder}
            required
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  post: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postState: state.postReducer
});

export default connect(mapStateToProps, { addPost, addComment})(PostForm);