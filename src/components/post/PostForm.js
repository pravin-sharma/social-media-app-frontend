import React, { Fragment, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import authContext from "../../context/auth/authContext";

import postContext from "../../context/post/postContext";
import alertContext from "../../context/alert/alertContext";

const PostForm = () => {
  const { user } = useContext(authContext);
  const { setAlert } = useContext(alertContext);
  const {
    addPost,
    loadingAddPostForm,
    errorAddPostForm,
    clearAddPostError,
  } = useContext(postContext);

  //   modal control
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [file, setFile] = useState("");

  useEffect(() => {
    if (errorAddPostForm) {
      setAlert(errorAddPostForm, "danger");
      clearAddPostError();
    }
  }, [errorAddPostForm]);

  useEffect(() => {
    if (!errorAddPostForm && !loadingAddPostForm) {
      handleClose();
      setCaption("");
      setFile("");
    }
  }, [loadingAddPostForm]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addPost({ caption, visibility, file });
  };

  return (
    <Fragment>
      <div className="bg-white p-3 mt-3 rounded border shadow">
        <div className="d-flex" type="button" onClick={handleShow}>
          <div className="p-1">
            <img
              src={user?.profilePicUrl}
              alt="avatar"
              className="rounded-circle me-2"
              style={{ width: "38px", height: "38px", objectFit: "cover" }}
            />
          </div>
          <input
            type="text"
            className="form-control rounded-pill border-0 bg-gray pointer"
            disabled
            value={caption}
            placeholder={`What's on your mind?`}
          />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark text-center w-100 m-0">
            Create Post
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-1">
                  <div className="p-2">
                    <img
                      src={user?.profilePicUrl}
                      alt="from fb"
                      className="rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <p className="m-0 fw-bold text-capitalize">{user?.name}</p>
                    <select
                      className="form-select border-0 bg-gray w-100 fs-7"
                      aria-label="Default select example"
                      name="visibility"
                      onChange={(e) => {
                        setVisibility(e.target.value);
                      }}
                    >
                      <option value="public">Public</option>
                      <option value="private">Friends</option>
                    </select>
                  </div>
                </div>
                {/* <!-- caption --> */}
                <div>
                  <textarea
                    cols="12"
                    rows="3"
                    className="form-control border-0"
                    name="caption"
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                    placeholder="Caption here..."
                  ></textarea>
                </div>
                <input
                  type="file"
                  className="form-control mt-3"
                  placeholder="Upload Media"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              className={loadingAddPostForm ? "w-100 disabled" : "w-100"}
              onClick={onSubmitHandler}
            >
              {loadingAddPostForm ? "Posting" : "Post"}
              {loadingAddPostForm ? (
                <span className="ms-2 spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default PostForm;
