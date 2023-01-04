import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import PostForm from "../post/PostForm";
import Posts from "../post/Posts";


const Home = () => {
  //load user
  const { loadLoggedInUser, user } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    loadLoggedInUser();
    console.log("rendered home");
  }, []);

  useEffect(()=>{
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    }
  },[user])

  const [postsType, setPostsType] = useState("myFeeds");

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-10 col-md-7 col-xl-8 me-3 pb-5">
          <PostForm />
          {/* Post type selector - feeds, trending */}
          <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-xl-10 mt-2 border rounded shadow">
              <ul className="nav nav-pills nav-fill" style={{cursor: "pointer"}}>
                <li
                  className="nav-item"
                  onClick={() => setPostsType("myFeeds")}
                >
                  <div
                    className={
                      postsType === "myFeeds" ? "nav-link shadow active" : "nav-link"
                    }
                  >
                    My Feeds
                  </div>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setPostsType("trending")}
                >
                  <div
                    className={
                      postsType === "trending" ? "nav-link shadow active" : "nav-link"
                    }
                  >
                    Trending
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Posts postsType={postsType}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
