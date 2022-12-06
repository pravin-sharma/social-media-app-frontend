import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const Login = () => {
  const navigate = useNavigate();

  const { login, error, isAuthenticated, clearError } = useContext(authContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      setAlert("Login Successful", "success");
      navigate("/home");
      // clearField();
    }
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <Fragment>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="">
                  <h2 className="fw-bold mb-2 text-uppercase text-white">
                    Login
                  </h2>
                  <p className="text-white-50 mb-4 text-white">
                    Please enter your email and password!
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-floating form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        value={email}
                        onChange={onChange}
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
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
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <div className="d-flex mb-3 align-items-center justify-content-center">
                      <Link className="text-light" to={"/email-verification"}>
                        Verify Email
                      </Link>
                      <div className="vr mx-3" style={{color: "white", opacity: 1}}></div>
                      <Link className="text-light" to={"/forgot-password"}>
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      className="btn btn-success btn-lg px-5"
                      type="submit"
                    >
                      Login  <i className="fa-solid fa-key" />
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

export default Login;
