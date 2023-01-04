import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import searchContext from "../../context/search/searchContext";

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const { searchUser, searchResult, clearSearchResult } =
    useContext(searchContext);

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (inputText) {
      searchUser(inputText);
    } else {
      clearSearchResult();
    }
  }, [inputText]);

  const onResultClick = (userId) => {
    navigate(`/profile/${userId}`);

    // Clean up
    setInputText("");
    clearSearchResult();
  };

  return (
    <Fragment>
      <div className="col-4 col-sm-5 col-md-7 col-xl-7">
        <Form className="d-flex position-relative">
          <Form.Control
            size=""
            type="search"
            placeholder="Search User"
            className="me-2"
            name="inputText"
            value={inputText}
            onChange={onInputChange}
          />
          <div
            className="position-absolute top-100 start-0 bg-white w-100 mt-1"
            style={
              inputText != ""
                ? { border: "1px solid #0000005c", borderRadius: "10px" }
                : {}
            }
          >
            {searchResult?.length
              ? searchResult.map((result, index) => {
                  let isLastElement = false;
                  if (searchResult.length - 1 == index) isLastElement = true;
                  return (
                    <div
                      key={result._id}
                      style={
                        !isLastElement
                          ? { borderBottom: "1px solid #0000005c" }
                          : {}
                      }
                      className="p-2"
                      onClick={() => onResultClick(result._id)}
                    >
                      <div
                        className="d-flex align-item-center"
                        style={{ cursor: "pointer" }}
                      >
                        {/* Profile Pic */}
                        <img
                          src={result.profilePicUrl}
                          alt=""
                          className="rounded-circle"
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                          }}
                        />
                        {/* Name */}
                        <div className="text-capitalize ms-2">
                          {result.name}
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
            {searchResult.length == 0 && inputText && (
              <div className="">No result found</div>
            )}
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default SearchBar;
