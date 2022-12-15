import React, { useReducer } from "react";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";


import { CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT } from "../types";
import axios from "axios";

const SearchState = (props) => {
  const initialState = {
    searchResult: []
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchUser = async(text) =>{
    try {
      const res = await axios.get(`/user/search?text=${text}`);
      dispatch({type: SET_SEARCH_RESULT, payload: res.data.result})
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const clearSearchResult = () =>{
    dispatch({type: CLEAR_SEARCH_RESULT});
  }
  return (
    <SearchContext.Provider
      value={{
        searchResult: state.searchResult,

        searchUser,
        clearSearchResult
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
