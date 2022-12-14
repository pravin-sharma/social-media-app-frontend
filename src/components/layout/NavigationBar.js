import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import profileContext from "../../context/profile/profileContext";
import postContext from "../../context/post/postContext";

const NavigationBar = ({ title, logo }) => {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const { clearPosts } = useContext(postContext);
  const { clearAllProfile  } = useContext(profileContext);
  const { setAlert } = useContext(AlertContext);

  const onLogout = () => {
    logout();
    clearPosts();
    clearAllProfile();

    setAlert("Logged Out Successfully", "warning");
  };

  const AuthLink = (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-light me-4 text-capitalize">Welcome, {user?.name}</div>
      <NavLink
        to={`/profile/${user?._id}`}
        className={({ isActive }) =>
          isActive ? "btn me-4 btn-light" : " btn me-4 btn-outline-light"
        }
      >
        Profile
      </NavLink>
      <a onClick={onLogout} href="#!" className="btn btn-outline-light">
        Logout
      </a>
    </div>
  );

  const guestLink = (
    <div className="d-flex justify-content-center align-items-center">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "btn me-4 btn-light" : " btn me-4 btn-outline-light"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? "btn me-4 btn-light" : " btn me-4 btn-outline-light"
        }
      >
        Register
      </NavLink>
    </div>
  );

  return (
    <nav className="navbar bg-dark">
      <div className="container justify-content-center justify-content-sm-between">
        <NavLink
          className="navbar-brand text-light d-flex align-items-center justify-content-between mb-2 mb-md-0 me-5"
          to="/home"
        >
          <img
            src={logo}
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block me-2"
          />
          {title}
        </NavLink>

        {!isAuthenticated && guestLink}
        {isAuthenticated && AuthLink}
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

NavigationBar.defaultProps = {
  title: "JellUp",
  logo: "/logo.png",
};

export default NavigationBar;
