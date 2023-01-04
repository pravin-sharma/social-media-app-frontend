import React, { Fragment, useContext, useEffect, useState } from "react";
import alertContext from "../../context/alert/alertContext";
import postContext from "../../context/post/postContext";
import PostItem from '../post/PostItem';
import authContext from '../../context/auth/authContext'

const AdminPostsContainer = () => {
  const { posts, getPosts, error, clearError } = useContext(postContext);
  const { setAlert } = useContext(alertContext);
  const {user} = useContext(authContext);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
      getPosts();
  }, []);

  //get all posts

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="col-12 col-xl-10">
        {posts.length
          ? posts.map((post) => <PostItem post={post} loggedInUser={user}  key={post._id} />)
          : "No Posts Found"}
      </div>
    </div>
  );
};

export default AdminPostsContainer;
