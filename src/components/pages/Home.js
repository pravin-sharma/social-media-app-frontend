import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import PostForm from "../post/PostForm";
import PostItem from "../post/PostItem";
import Posts from "../post/Posts";
import TrendingPostItem from "../post/TrendingPostItem";
import TrendingPosts from "../post/TrendingPosts";
const Home = () => {
  //load user
  const { loadLoggedInUser } = useContext(authContext);

  useEffect(() => {
    loadLoggedInUser();
    console.log("rendered home")

  }, []);

  //set auth true and loading false

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-10 col-md-7 col-xl-8 me-3 pb-5">
          <PostForm />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
