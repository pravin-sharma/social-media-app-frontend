import { useReducer } from "react";
import AuthContext from "./authContext";
import React from "react";
import authReducer from "./authReducer";
import axios from "axios";
import setTokenInHeader from "../../utils/setTokenInHeader";

import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  SET_LOADING,
  SET_EMAIL_VERIFIED,
  CLEAR_EMAIL_VERIFIED,
  CLEAR_IS_REGISTERED,
  FORGOT_PASSWORD,
  SET_TRIGGER,
  CLEAR_TRIGGER,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    isVerified: false,
    user: null,
    token: localStorage.getItem("token"),
    error: null,
    loading: true,
    isRegistered: false,
    trigger: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadLoggedInUser = async () => {
    if (localStorage.getItem("token")) {
      setTokenInHeader(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/user");
      dispatch({ type: USER_LOADED, payload: res.data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  //Register User
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/signup", formData, config);
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  // Verify User's Email
  const verifyEmail = async (verificationCode, baseUrl) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const payload = {
      verificationCode,
    };
    try {
      const res = await axios.post(`/user/verify`, payload, config);
      dispatch({ type: SET_EMAIL_VERIFIED });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  //clear email verified state
  const clearIsVerifiedState = () => {
    dispatch({ type: CLEAR_EMAIL_VERIFIED });
  };
  //clear isRegistered state
  const clearIsRegisteredState = () => {
    dispatch({ type: CLEAR_IS_REGISTERED });
  };

  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/login", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      //Setting Token in local storage here, instead of dispatch since I was unable to fetch token inside loadLoggedInUser(); in time
      localStorage.setItem("token", res.data?.token);
      localStorage.setItem("loggedInUserId", res.data?.loggedInUserId);
      loadLoggedInUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    const payload = {
      email,
      passwordResetUrl: window.location.origin + "/reset-password",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/user/passwordReset", payload, config);
      dispatch({ type: SET_TRIGGER });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  //Password Reset
  const resetPassword = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/user/passwordResetPerform", formData, config);
      dispatch({ type: SET_TRIGGER });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  // clear trigger
  const clearTrigger = () => {
    dispatch({ type: CLEAR_TRIGGER });
  };

  //Logout user
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //clear errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <AuthContext.Provider
      value={{
        // state values
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        error: state.error,
        user: state.user,
        token: state.token,
        isRegistered: state.isRegistered,
        trigger: state.trigger,

        // functions
        registerUser,
        verifyEmail,
        clearError,
        loadLoggedInUser,
        login,
        logout,
        setLoading,
        clearIsVerifiedState,
        clearIsRegisteredState,
        forgotPassword,
        resetPassword,
        clearTrigger,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
