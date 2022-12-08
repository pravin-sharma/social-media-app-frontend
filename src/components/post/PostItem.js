import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import moment from "moment/moment";
import React from "react";
const PostItem = ({ post }) => {
  const { caption, mediaUrl, mediaType, comments, likes, createdAt, user } =
    post;
  const postId = post._id;
  const { name, profilePicUrl, username } = user;
  const userId = user._id;

  //show preview
  // const myImage = new CloudinaryImage(mediaUrl).resize(fill().width(100).height(150));

  return (
    <div className="d-flex flex-column bg-white p-4 rounded shadow mt-3">
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
            {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
          </div>
        </div>
      </div>
      {/* Caption */}
      <div className="my-2">{caption}</div>
      {/* Media View */}
      {mediaUrl && mediaType === "image" && (
        <img alt="post"  className="img-fluid rounded mb-2" src={mediaUrl} />
      )}
      {mediaUrl && mediaType === "video" && (
        <video controls width="100%">
          <source src={mediaUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
      {/* Likes and Comments */}
      <div className="d-flex justify-content-between mb-2">
        <div className="">
          <i className="fa-solid fa-thumbs-up text-primary" /> {likes.length}
        </div>
        <div className="">{comments.length} comments</div>
      </div>
      {/* Action bar */}
      <div className="d-flex border-top border-bottom justify-content-around">
        <button className="p-2 p-2 w-100 my-btn-secondary">
          <i className="fa-solid fa-thumbs-up fa-lg text-muted" /> Like
        </button>
        <button className="p-2 p-2 pointer w-100  my-btn-secondary">
          <i className="fa-solid fa-comment fa-lg text-muted" /> Comment
        </button>
      </div>
    </div>
  );
};

export default PostItem;
