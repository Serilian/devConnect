import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, GET_REPOS, UPDATE_PROFILE } from "../actions/actionTypes";

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
    case UPDATE_PROFILE:
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
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false

      };
    default:
      return state;
  }
};

export default reducer;