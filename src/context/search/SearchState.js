import React, { useReducer } from "react";
import SearchContext from "./searchContext";
import searchReducer from "./searchReducer";


import {

} from "../types";
import axios from "axios";

const SearchState = (props) => {
  const initialState = {
    searchResult: []
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);


  return (
    <SearchContext.Provider
      value={{
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
