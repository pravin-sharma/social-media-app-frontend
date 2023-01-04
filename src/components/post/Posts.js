import React, { Fragment, useContext, useEffect, useState } from "react";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";
import postContext from "../../context/post/postContext";
import PostItem from "./PostItem";

const Posts = ({postsType}) => {
  const { posts, getPosts,getTrendingPosts, error, clearError } = useContext(postContext);
  const { setAlert } = useContext(alertContext);
  const {user} = useContext(authContext);

  useEffect(() => {
    if (error) {
      console.log('inside posts')
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if(postsType=='myFeeds'){
      getPosts();
    }else{
      getTrendingPosts();
    }
  }, [postsType]);

  //get all posts

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="col-12 col-xl-10">
        {posts.length
          ? posts.map((post) => <PostItem post={post} loggedInUser={user} key={post._id} />)
          : "No Posts Found"}
      </div>
    </div>
  );
};

export default Posts;
