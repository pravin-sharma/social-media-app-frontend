import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import PostForm from "../post/PostForm";
import PostItem from "../post/PostItem";
import Posts from "../post/Posts";
import TrendingPostItem from "../post/TrendingPostItem";
import TrendingPosts from "../post/TrendingPosts";
const Home = () => {
  //load user
  const { loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);

  //set auth true and loading false

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-10 col-md-7 col-xl-8 me-3 pb-5">
          <PostForm />
          <Posts />
        </div>
        <div className="d-none d-md-block col-md-4 col-xl-3 border">
          <TrendingPosts />
        </div>
      </div>
    </div>
  );
};

export default Home;
