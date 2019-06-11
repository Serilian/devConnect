import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}

};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: null
      };
    default:
      return state;
  }
};

export default reducer;