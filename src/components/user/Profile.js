import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";
import profileContext from "../../context/profile/profileContext";
import ProfilePostItem from "./ProfilePostItem";
import ProfileUpdateForm from "./ProfileUpdateForm";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loadLoggedInUser } = useContext(authContext);
  const {
    loggedUserProfile,
    otherUserProfile,
    loggedUserPosts,
    otherUserPosts,
    getLoggedUserProfile,
    clearLoggedUserProfile,
    getOtherUserProfile,
    clearOtherUserProfile,
    getLoggedUserPosts,
    clearLoggedUserPosts,
    getOtherUserPosts,
    clearOtherUserPosts,
    getLoggedUserFriends,
    getOtherUserFriends,
    clearOtherUserFriends,
    loggedUserFriends,
    otherUserFriends,
    addUserAsFriend,
    loggedUserFriendRequests,
    getFriendRequests,
    getSentRequests,
    sentFriendRequests,
    clearSentRequests,
    withdrawFriendRequest,
    removeFriend,
    acceptFriendRequest,
    declineFriendRequest,

    error,
    clearProfileError,
  } = useContext(profileContext);
  const { setAlert } = useContext(alertContext);
  const { userId } = useParams();

  // Update User Info modal - modal control
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const handleCloseUpdateUserModal = () => setShowUpdateUserModal(false);
    const handleShowUpdateUserModal = () => setShowUpdateUserModal(true);

  // Tab Selection State
  const [key, setKey] = useState("posts");

  // Add friend button toggle
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);

  // is Friend
  const [isFriend, setIsFriend] = useState(false);

    //loggedIn User Id:
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    //does Profile Belongs To LoggedIn User
    const doesProfileBelongsToLoggedUser = userId == loggedInUserId;

  const onLoadCheckIsFriendRequestSent = (userId) => {
    let isRequestSent = sentFriendRequests?.filter(
      (request) => request.user._id == userId
    );
    isRequestSent?.length > 0
      ? setIsFriendRequestSent(true)
      : setIsFriendRequestSent(false);
  };

  const onLoadIsFriendCheck = () => {
    // console.log("called:", otherUserFriends);
    let isFriend = otherUserFriends?.filter(
      (friend) => friend.user._id == loggedInUserId
    );
    isFriend?.length > 0
      ? setIsFriend(true)
      : setIsFriend(false);
  };

  // on mount / refresh / 1st time
  useEffect(() => {
    loadLoggedInUser();

    getLoggedUserProfile(loggedInUserId);
    getLoggedUserPosts(loggedInUserId);
    getLoggedUserFriends(loggedInUserId);
    getFriendRequests(loggedInUserId);
    getSentRequests(loggedInUserId);
    setKey("posts");

    if (!doesProfileBelongsToLoggedUser) {
      getOtherUserProfile(userId);
      getOtherUserPosts(userId);
      getOtherUserFriends(userId);
    }
    console.log("profile - mounted");
    return () => {
      console.log("profile - unmounted");
      clearOtherUserProfile();
      clearOtherUserPosts();
      clearOtherUserFriends();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      if (!doesProfileBelongsToLoggedUser) {
        getOtherUserProfile(userId);
        getOtherUserPosts(userId);
        getOtherUserFriends(userId);
        setKey("posts");
      }
      console.log("userId changed");
    }
    return () => {
      console.log("user id cleared");
      clearOtherUserProfile();
      clearOtherUserPosts();
      clearOtherUserFriends();
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      onLoadCheckIsFriendRequestSent(userId);
    }
  }, [sentFriendRequests, userId]);

  useEffect(()=>{
    onLoadIsFriendCheck();
  }, [otherUserFriends])

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearProfileError();
    }
  }, [error]);

  const OnClickRemoveFriend = (friendId) => {
    removeFriend(friendId);
  };

  const onClickName = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Fragment>
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-10 col-md-7 col-xl-8 me-3 pb-5">
          {/* Main Column */}
          <div className="border mt-3">
            <div className="p-4 pt-3">
              {/* Header */}
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  {/* Profile Pic */}
                  <img
                    src={
                      doesProfileBelongsToLoggedUser
                        ? loggedUserProfile?.profilePicUrl
                        : otherUserProfile?.profilePicUrl
                    }
                    className="rounded-circle"
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex flex-column ms-3">
                    {/* Name */}
                    <div className="text-capitalize fw-bold fs-3">
                      {doesProfileBelongsToLoggedUser
                        ? loggedUserProfile?.name
                        : otherUserProfile?.name}
                    </div>
                    {/* Friends Count*/}
                    <div className="fw-semibold text-muted">
                      {doesProfileBelongsToLoggedUser
                        ? loggedUserFriends.length
                        : otherUserFriends.length}{" "}
                      friends
                    </div>
                  </div>
                </div>
                {/* Edit User Info - button */}
                 {doesProfileBelongsToLoggedUser && <button className="mt-3 btn btn-secondary btn-sm" onClick={handleShowUpdateUserModal}><FontAwesomeIcon icon={faUserEdit}/> Update Info</button>}
                {/* Add friends */}
                {!doesProfileBelongsToLoggedUser && !isFriendRequestSent && !isFriend && (
                  <button
                    className="btn btn-primary mt-3 mb-2 btn-sm"
                    onClick={() => {
                      addUserAsFriend(otherUserProfile?._id);
                      setIsFriendRequestSent(true);
                    }}
                  >
                    Add Friend
                  </button>
                )}

                {/* withdraw friend request */}
                {!doesProfileBelongsToLoggedUser && isFriendRequestSent && !isFriend && (
                  <button
                    className="btn btn-secondary mt-3 mb-2 btn-sm"
                    onClick={() => {
                      withdrawFriendRequest(otherUserProfile?._id);
                      setIsFriendRequestSent(false);
                    }}
                  >
                    Friend Request Sent
                  </button>
                )}

                {/* Remove friend button */}
                {!doesProfileBelongsToLoggedUser && !isFriendRequestSent && isFriend && (
                  <button
                    className="btn btn-danger mt-3 mb-2 btn-sm"
                    onClick={() => {
                      OnClickRemoveFriend(otherUserProfile._id);
                      setIsFriend(false);
                    }}
                  >
                    Remove Friend
                  </button>
                )}
              </div>

              {/* Tabs */}
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mt-3"
              >
                {/* Posts */}
                <Tab eventKey="posts" title="Posts">
                  {doesProfileBelongsToLoggedUser
                    ? loggedUserPosts?.length
                      ? loggedUserPosts.map((post) => (
                          <ProfilePostItem
                            post={post}
                            key={post._id}
                            loggedInUser={user}
                            doesProfileBelongsToLoggedUser={
                              doesProfileBelongsToLoggedUser
                            }
                          />
                        ))
                      : "No Posts Found"
                    : otherUserPosts?.length
                    ? otherUserPosts.map((post) => (
                        <ProfilePostItem
                          post={post}
                          key={post._id}
                          loggedInUser={user}
                          doesProfileBelongsToLoggedUser={
                            doesProfileBelongsToLoggedUser
                          }
                        />
                      ))
                    : "No Posts Found"}
                </Tab>

                {/* Friends List */}
                <Tab eventKey="friends" title="Friends">
                  {doesProfileBelongsToLoggedUser
                    ? loggedUserFriends?.length
                      ? loggedUserFriends.map((friend) => (
                          <div
                            className="d-flex align-items-center mt-3 pb-2 border-bottom"
                            key={friend.user?._id}
                          >
                            {/* Profile Pic */}
                            <img
                              src={friend.user?.profilePicUrl}
                              className="rounded-circle"
                              alt=""
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="d-flex flex-column w-100 ms-3">
                              {/* Name */}
                              <div
                                className="text-capitalize fw-semibold fs-6"
                                style={{ cursor: "pointer" }}
                                onClick={() => onClickName(friend.user?._id)}
                              >
                                {friend.user?.name}
                              </div>
                              <button
                                className="btn btn-primary w-50 btn-sm mt-1"
                                onClick={() =>
                                  OnClickRemoveFriend(friend.user?._id)
                                }
                              >
                                Remove Friend
                              </button>
                            </div>
                          </div>
                        ))
                      : "No Friends"
                    : otherUserFriends?.length
                    ? otherUserFriends.map((friend) => (
                        <div
                          className="d-flex align-items-center mt-3 pb-2 border-bottom"
                          key={friend.user?._id}
                        >
                          {/* Profile Pic */}
                          <img
                            src={friend.user?.profilePicUrl}
                            className="rounded-circle"
                            alt=""
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="d-flex flex-column ms-3">
                            {/* Name */}
                            <div
                              className="text-capitalize fw-semibold fs-6"
                              style={{ cursor: "pointer" }}
                              onClick={() => onClickName(friend.user?._id)}
                            >
                              {friend.user?.name}
                            </div>
                          </div>
                        </div>
                      ))
                    : "No Friends"}
                </Tab>

                {/* Friend Requests */}

                {doesProfileBelongsToLoggedUser && (
                  <Tab eventKey="friendRequests" title={`Requests (${loggedUserFriendRequests?.length})`}>
                    {/* Friend Request List */}
                    {loggedUserFriendRequests.length
                      ? loggedUserFriendRequests.map((request) => (
                          <div
                            className="d-flex align-items-center mt-3 pb-2 border-bottom"
                            key={request._id}
                          >
                            {/* Profile Pic */}
                            <img
                              src={request.user?.profilePicUrl}
                              className="rounded-circle"
                              alt=""
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="d-flex flex-column ms-3">
                              {/* Name */}
                              <div
                                className="text-capitalize fw-semibold fs-6"
                                style={{ cursor: "pointer" }}
                                onClick={() => onClickName(request.user?._id)}
                              >
                                {request.user?.name}
                              </div>
                              {/* Accept/Decline button */}
                              <div className="d-flex justify-content-start">
                                <div
                                  className="btn btn-primary btn-sm"
                                  onClick={() =>
                                    acceptFriendRequest(request.user?._id)
                                  }
                                >
                                  Accept
                                </div>
                                <div
                                  className="btn btn-danger btn-sm ms-2"
                                  onClick={() =>
                                    declineFriendRequest(request.user?._id)
                                  }
                                >
                                  Decline
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : "No friend requests"}
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

    {loggedUserProfile && doesProfileBelongsToLoggedUser && <ProfileUpdateForm show={showUpdateUserModal} handleClose={handleCloseUpdateUserModal}/>}
    </Fragment>
  );
};

export default Profile;
