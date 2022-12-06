import {
  AUTH_ERROR,
  CLEAR_EMAIL_VERIFIED,
  CLEAR_ERRORS,
  CLEAR_IS_REGISTERED,
  CLEAR_TRIGGER,
  FORGOT_PASSWORD,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_EMAIL_VERIFIED,
  SET_LOADING,
  SET_TRIGGER,
  USER_LOADED,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
      };

    case SET_EMAIL_VERIFIED:
      return {
        ...state,
        loading: false,
        isVerified: true,
      };

    case CLEAR_EMAIL_VERIFIED:
      return {
        ...state,
        isVerified: false,
      };

    case CLEAR_IS_REGISTERED:
      return {
        ...state,
        isRegistered: false,
      };

    case SET_TRIGGER:
      return {
        ...state,
        trigger: true,
      };

    case CLEAR_TRIGGER:
      return {
        ...state,
        trigger: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isVerified: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isVerified: false,
        loading: false,
        error: action?.payload || null,
        user: null,
        trigger: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
