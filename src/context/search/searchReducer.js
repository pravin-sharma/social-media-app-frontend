import React from 'react';
import { CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT } from "../types";

const searchReducer = (state, action) => {
  switch(action.type){
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: [...action.payload]
      }
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        searchResult: []
      }
    default:
        return {
            ...state
        }
  }
}

export default searchReducer