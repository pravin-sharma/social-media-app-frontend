import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = () => {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const {
    registerUser,
    error,
    clearError,
    isRegistered,
    clearIsRegisteredState,
  } = authContext;

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { name, username, email, password } = user;

  useEffect(() => {
    if (error) {
      setAlert(`Register: ${error}`, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (isRegistered) {
      setAlert(
        `User with Email: ${email} Registered. Please check your email for verification code.`,
        "success"
      );
      navigate("/email-verification");
      clearIsRegisteredState();
      clearField();
    }
  }, [isRegistered]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    registerUser({
      name,
      username,
      email,
      password,
      baseUrl: window.location.origin
    });
  };

  const clearField = () => {
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Fragment>
      <div className="container py-4 mt-4">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="">
                  <h2 className="fw-bold mb-2 text-uppercase text-white">
                    Register
                  </h2>
                  <p className="text-white-50 mb-3 text-white">
                    Please enter the following details
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating form-outline form-white mb-4">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Enter Name"
                        value={name}
                        onChange={onChange}
                        required
                        minLength={3}
                      />
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                    </div>

                    <div className="form-floating form-outline form-white mb-4">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control form-control-lg"
                        placeholder="Enter Username"
                        value={username}
                        onChange={onChange}
                        required
                        minLength={5}
                      />
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                    </div>

                    <div className="form-floating form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={onChange}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength={6}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn btn-info btn-lg px-5"
                      type="submit"
                    >
                      Register <i className="fa-solid fa-user-plus" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
