import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminContext from "../../context/admin/adminContext";
import authContext from "../../context/auth/authContext";
import AdminAllUsersContainer from "../admin/AdminAllUsersContainer";
import AdminPostsContainer from "../admin/AdminPostsContainer";

const AdminDashboard = () => {
  const { loadLoggedInUser, user } = useContext(authContext);
  const { setDashboardTabType, selectedTab } = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadLoggedInUser();
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-10 col-md-7 col-xl-8 me-3 pb-5">
          {/* tab type selector - posts, users */}
          <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-xl-10 mt-2 border rounded shadow">
              <ul
                className="nav nav-pills nav-fill"
                style={{ cursor: "pointer" }}
              >
                <li
                  className="nav-item"
                  onClick={() => setDashboardTabType("posts")}
                >
                  <div
                    className={
                      selectedTab === "posts"
                        ? "nav-link shadow active"
                        : "nav-link"
                    }
                  >
                    Posts
                  </div>
                </li>
                <li
                  className="nav-item"
                  onClick={() => setDashboardTabType("users")}
                >
                  <div
                    className={
                      selectedTab === "users"
                        ? "nav-link shadow active"
                        : "nav-link"
                    }
                  >
                    Users
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Posts */}
          {selectedTab === "posts" && <AdminPostsContainer />}
          {/* Users */}
          {selectedTab === "users" && <AdminAllUsersContainer />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
