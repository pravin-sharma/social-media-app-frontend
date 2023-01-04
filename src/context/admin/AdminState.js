import React, { useContext, useReducer } from "react";

import {
  CLEAR_DASHBOARD_TAB_TYPE,
  CLEAR_SEARCH_RESULT,
  CLEAR_USERS,
  DELETE_USER,
  DELETE_USER_POST,
  DISABLE_USER,
  ENABLE_USER,
  SET_ADMIN_ERROR,
  SET_DASHBOARD_TAB_TYPE,
  SET_SEARCH_RESULT,
  SET_USERS,
} from "../types";
import axios from "axios";
import adminReducer from "./adminReducer";
import AdminContext from "./adminContext";
import alertContext from "../alert/alertContext";
import profileContext from "../profile/profileContext";

const AdminState = (props) => {
  const initialState = {
    users: [],
    filteredUsers: [],
    selectedTab: "posts",
    error: null,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  const setDashboardTabType = (type) => {
    dispatch({ type: SET_DASHBOARD_TAB_TYPE, payload: type });
  };
  const clearDashboardTabType = () => {
    dispatch({ type: CLEAR_DASHBOARD_TAB_TYPE });
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("/user/all");
      dispatch({ type: SET_USERS, payload: res.data.users });
    } catch (error) {
      dispatch({ type: SET_ADMIN_ERROR, payload: error.response.data.message });
    }
  };

  const clearUsers = async () => {
    dispatch({ type: CLEAR_USERS });
  };

  // enable user
  const enableUser = async (userId) => {
    try {
      const res = await axios.get(`/user/enable/${userId}`);
      dispatch({ type: ENABLE_USER, payload: res.data.user });
    } catch (error) {
      dispatch({ type: SET_ADMIN_ERROR, payload: error.response.data.message });
    }
  };

  //disable user
  const disableUser = async (userId) => {
    try {
      const res = await axios.get(`/user/disable/${userId}`);
      dispatch({ type: DISABLE_USER, payload: res.data.user });
    } catch (error) {
      dispatch({ type: SET_ADMIN_ERROR, payload: error.response.data.message });
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`/user/${userId}`);
      dispatch({ type: DELETE_USER, payload: res.data.user });
    } catch (error) {
      dispatch({ type: SET_ADMIN_ERROR, payload: error.response.data.message });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        filteredUsers: state.filteredUsers,
        selectedTab: state.selectedTab,

        setDashboardTabType,
        clearDashboardTabType,
        getUsers,
        clearUsers,
        enableUser,
        disableUser,
        deleteUser,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
