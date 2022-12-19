import React from "react";
import {
  CLEAR_DASHBOARD_TAB_TYPE,
  CLEAR_USERS,
  DELETE_USER,
  DELETE_USER_POST,
  DISABLE_USER,
  ENABLE_USER,
  SET_DASHBOARD_TAB_TYPE,
  SET_USERS,
} from "../types";

const adminReducer = (state, action) => {
  switch (action.type) {
    case SET_DASHBOARD_TAB_TYPE:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case CLEAR_DASHBOARD_TAB_TYPE:
      return {
        ...state,
        selectedTab: null,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      }
    case ENABLE_USER:
    case DISABLE_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if(user._id == action.payload._id){
            user.isDisabled = action.payload.isDisabled
          }
          return user;
        })
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload._id)
      }
    default:
      return {
        ...state,
      };
  }
};

export default adminReducer;
