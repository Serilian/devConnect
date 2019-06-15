import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR, REMOVE_COMMENT,
  UPDATE_LIKES
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};


const reducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post => {
          if (post._id === payload.id) {
            return { ...post, likes: payload.likes };
          }
          return post;
        })
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post._id !== payload.id)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload),
          loading: false
        }
      };
    default:
      return state;
  }

};

export default reducer;