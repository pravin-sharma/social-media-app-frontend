import {
  faSquareMinus,
  faSquarePlus,
  faThumbsUp as faThumbsUpRg,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faComment,
  faEarthAmericas,
  faLock,
  faThumbsUp,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profileContext from "../../context/profile/profileContext";
import PostUpdateForm from "./PostUpdateForm";

const ProfilePostItem = ({ post, doesProfileBelongsToLoggedUser }) => {
  const navigate = useNavigate();

  //Render Post Item
  const {
    caption,
    mediaUrl,
    visibility,
    mediaType,
    comments,
    likes,
    createdAt,
    user,
  } = post;
  const postId = post._id;
  // User who posted the post
  const { name, profilePicUrl } = user;

  let loggedInUserId = localStorage.getItem("loggedInUserId");

  // Like feature
  const { likePost } = useContext(profileContext);
  const [isLiked, setIsLiked] = useState(false);
  const isPostLikedByYou = () => {
    const isLiked = post?.likes.filter(
      (like) => like.user._id == loggedInUserId
    );
    isLiked.length > 0 ? setIsLiked(true) : setIsLiked(false);
  };
  useEffect(() => {
    isPostLikedByYou();
  }, [post]);

  const onLikeClick = (event) => {
    likePost(postId, doesProfileBelongsToLoggedUser);
    setIsLiked(!isLiked);
  };

  const onLikeHover = () => {
    //TODO: show people name
    const whoLiked = likes.map((like) => like.user.name);
    console.log(whoLiked);
  };

  //comments feature
  const { addComment, removeComment } = useContext(profileContext);
  const [comment, setComment] = useState("");
  const [viewPreviousComments, setViewPreviousComments] = useState(false);

  const lastComment = comments[comments.length - 1];

  const onCommentSubmit = (e) => {
    if (e.key == "Enter") {
      //add comment
      addComment(postId, comment, doesProfileBelongsToLoggedUser);
      setComment("");
    }
  };

  const onCommentRemove = (commentId) => {
    removeComment(postId, commentId, doesProfileBelongsToLoggedUser);
  };

  const onClickName = (userId) => {
    navigate(`/profile/${userId}`);
  };

  //Delete post feature
  const { deleteLoggedUserPost } = useContext(profileContext);
  const onDeleteClick = () => {
    deleteLoggedUserPost(postId);
  };

  //Update post feature
  // Update User Info modal - modal control
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const handleShowUpdatePostModal = () => setShowUpdatePostModal(true);
  const handleCloseUpdatePostModal = () => setShowUpdatePostModal(false);

  return (
    <Fragment>
      {/* Post Item */}
      <div className="d-flex flex-column bg-white p-4 pb-2 rounded shadow my-3">
        {/* Header */}
        <div className="d-flex">
          <img
            className="rounded-5"
            src={profilePicUrl}
            alt="profile"
            style={{ width: "38px", height: "38px", objectFit: "cover" }}
          />
          <div className="d-flex flex-column ms-2">
            <div className="text-capitalize">{name}</div>
            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
              {moment(createdAt).format("MMM Do YYYY, h:mm a")}
            </div>
          </div>
          <div className="d-flex align-items-center ms-auto">

            {/* Visibility */}
            {visibility == "public" ? (
              <FontAwesomeIcon icon={faEarthAmericas} />
            ) : (
              <FontAwesomeIcon icon={faUserGroup} />
            )}

            {/* Drop down */}
            {doesProfileBelongsToLoggedUser && (
              <Dropdown className="ms-2">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  size="sm"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowUpdatePostModal}>
                    Update
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onDeleteClick}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
        {/* Caption */}
        <div className="my-2">{caption}</div>
        {/* Media View */}
        {mediaUrl && mediaType === "image" && (
          <img alt="post" className="rounded mb-2" src={mediaUrl} />
        )}
        {mediaUrl && mediaType === "video" && (
          <video controls width="100%" className="rounded mb-2">
            <source src={mediaUrl} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        {/* Likes and Comments */}
        <div className="d-flex justify-content-between mb-2">
          <div onMouseEnter={onLikeHover} className="text-primary">
            <FontAwesomeIcon icon={faThumbsUp} /> {likes.length}
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setViewPreviousComments(!viewPreviousComments);
            }}
          >
            {comments.length} comments
          </div>
        </div>
        {/* Action bar */}
        <div className="d-flex border-top border-bottom justify-content-around ">
          <button
            className="p-2 p-2 w-100 my-btn-secondary text-muted"
            onClick={onLikeClick}
          >
            {isLiked ? (
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="text-primary me-1"
              />
            ) : (
              <FontAwesomeIcon icon={faThumbsUpRg} className="me-1" />
            )}
            Like
          </button>
          <button
            className="p-2 p-2 pointer w-100  my-btn-secondary text-muted"
            onClick={() => document.getElementById(postId).focus()}
          >
            <FontAwesomeIcon icon={faComment} /> Comment
          </button>
        </div>
        {/* Comments */}
        {/* view previous comments button */}
        {comments.length > 1 && (
          <button
            className={
              viewPreviousComments
                ? "btn btn-secondary btn-sm mt-2"
                : "btn btn-primary btn-sm mt-2"
            }
            onClick={() => setViewPreviousComments(!viewPreviousComments)}
          >
            {viewPreviousComments ? (
              <>
                Collapse previous comments
                <FontAwesomeIcon icon={faSquareMinus} className="ms-1" />
              </>
            ) : (
              <>
                View previous comments
                <FontAwesomeIcon icon={faSquarePlus} className="ms-1" />
              </>
            )}
          </button>
        )}
        {/* previous comments */}
        {viewPreviousComments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <div className="d-flex mt-3" key={comment._id}>
              <img
                src={comment.user.profilePicUrl}
                alt="avatar"
                className="rounded-circle me-2"
                style={{ width: "38px", height: "38px", objectFit: "cover" }}
              />
              <div className="d-flex align-items-center ms-2">
                <div className="d-flex flex-column comment-input-bg rounded">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickName(comment.user._id)}
                    className="mx-2 mt-1 text-capitalize"
                  >
                    {comment.user.name}
                  </div>
                  <div
                    className="mx-2 mb-1 text-muted text-break"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {comment.text}
                  </div>
                </div>
                {/* delete button */}
                {comment.user._id === loggedInUserId && (
                  <div onClick={() => onCommentRemove(comment._id)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-danger ms-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

        {/* last comment */}
        {lastComment && !viewPreviousComments && (
          <div className="d-flex mt-3">
            <img
              src={lastComment.user.profilePicUrl}
              alt="avatar"
              className="rounded-circle me-2"
              style={{ width: "38px", height: "38px", objectFit: "cover" }}
            />
            <div className="d-flex align-items-center ms-2">
              <div className="d-flex flex-column comment-input-bg rounded">
                <div
                  className="mx-2 mt-1 text-capitalize"
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickName(lastComment.user._id)}
                >
                  {lastComment.user.name}
                </div>
                <div
                  className="mx-2 mb-1 text-muted text-break"
                  style={{ fontSize: "0.8rem" }}
                >
                  {lastComment.text}
                </div>
              </div>
              {/* delete button */}
              {lastComment.user._id === loggedInUserId && (
                <div onClick={() => onCommentRemove(lastComment._id)}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-danger ms-2"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Comment Input */}
        <div className="d-flex mt-2">
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
            className="form-control rounded-pill border-0 pointer comment-input-bg"
            name="comment"
            id={postId}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder={`Write a comment...`}
            onKeyDown={onCommentSubmit}
          />
        </div>
      </div>

      {/* Post Update Modal */}
      {doesProfileBelongsToLoggedUser && (
        <PostUpdateForm
          show={showUpdatePostModal}
          handleClose={handleCloseUpdatePostModal}
          post={post}
        />
      )}
    </Fragment>
  );
};

export default ProfilePostItem;
