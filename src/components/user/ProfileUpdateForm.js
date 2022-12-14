import React, { Fragment, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import alertContext from "../../context/alert/alertContext";
import profileContext from "../../context/profile/profileContext";
import authContext from "../../context/auth/authContext";

const ProfileUpdateForm = ({ show, handleClose }) => {
  const { setAlert } = useContext(alertContext);
  const { loadLoggedInUser } = useContext(authContext);
  const {
    updateLoggedUserProfile,
    error,
    clearProfileError,
    loading,
    getLoggedUserPosts,
    getOtherUserFriends,
    otherUserProfile,
    loggedUserProfile
  } = useContext(profileContext);
  let [password, setPassword] = useState("");
  let [file, setFile] = useState("");

  const [userInfo, setUserInfo] = useState({...loggedUserProfile});
  let { profilePicUrl, name, email, username } = userInfo;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearProfileError();
    }
  }, [error]);

  useEffect(() => {
    if (!error && !loading && show) {
      handleClose();
      setUserInfo(loggedUserProfile);
      getLoggedUserPosts(userInfo?._id);
      //   otherUserProfile?._id && getOtherUserFriends(otherUserProfile?._id)
      loadLoggedInUser();
    }
  }, [loading]);

  const onChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateButtonClick = (e) => {
    e.preventDefault();
    updateLoggedUserProfile({
      profilePicUrl,
      name,
      email,
      username,
      file,
      password,
    });
    // loadLoggedInUser();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark text-center w-100 m-0">
          Update User
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={onUpdateButtonClick}>
        <Modal.Body>
          {/* Profile Pic */}
          <div className="mb-3 d-flex flex-column">
            <div className="form-label">Profile Picture</div>
            <img
              src={profilePicUrl}
              alt=""
              className="rounded-circle"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
            />
            <input
              type="file"
              className="form-control mt-3"
              placeholder="Upload New Profile Pic"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              id="name"
              placeholder="Enter your name"
              onChange={onChangeHandler}
              required
              minLength={3}
            />
          </div>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              id="emailAddress"
              placeholder="Enter your email address"
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              className="form-control"
              id="username"
              placeholder="Enter your Username"
              onChange={onChangeHandler}
              required
              minLength={5}
            />
          </div>
          <hr />
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="text"
              name="password"
              value={password}
              className="form-control"
              id="password"
              placeholder="Enter new password to change or leave it empty"
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            className={loading ? "w-100 disabled" : "w-100"}
          >
            {loading ? (
              <>
                Updating{" "}
                <span className="ms-2 spinner-border spinner-border-sm"></span>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ProfileUpdateForm;
