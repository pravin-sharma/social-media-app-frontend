import React, { Fragment, useContext, useEffect, useState } from "react";
import alertContext from "../../context/alert/alertContext";
import postContext from "../../context/post/postContext";
import PostItem from "./PostItem";

import PostForm from "./PostForm";

const Posts = () => {
  const { posts, getPosts, error, clearError } = useContext(postContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (error) {
      console.log('inside posts')
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
          ? posts.map((post) => <PostItem post={post} key={post._id} />)
          : "No Posts Found"}
      </div>
    </div>
  );
};

export default Posts;
