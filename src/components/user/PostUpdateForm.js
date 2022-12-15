import React, { Fragment, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import alertContext from "../../context/alert/alertContext";
import profileContext from "../../context/profile/profileContext";
import authContext from "../../context/auth/authContext";

const PostUpdateForm = ({ show, handleClose, post }) => {
  const { setAlert } = useContext(alertContext);
  const { error, clearProfileError, loading, loggedUserPosts, updatePost } =
    useContext(profileContext);

  const [postContent, setPostContent] = useState({ ...post });
  let { _id, caption, visibility } = postContent;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearProfileError();
    }
  }, [error]);

  useEffect(() => {
    if (loggedUserPosts && !error && show) {
      handleClose();
    }
  }, [loggedUserPosts]);

  const onChangeHandler = (e) => {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateButtonClick = (e) => {
    e.preventDefault();
    updatePost(_id, {
      caption,
      visibility,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark text-center w-100 m-0">
          Update Post
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={onUpdateButtonClick}>
        <Modal.Body>
          {/* caption */}
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">
              Caption
            </label>
            <textarea
              type="text"
              name="caption"
              value={caption}
              className="form-control"
              id="caption"
              placeholder="Enter your caption"
              onChange={onChangeHandler}
            />
          </div>
          {/* Visibility */}
          <label htmlFor="visibility" className="form-label">
              Visibility
            </label>
          <select
            className="form-select w-25"
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={onChangeHandler}
          >
            <option value="public">Public</option>
            <option value="private">Friends</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            className="w-100"
          >
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PostUpdateForm;
