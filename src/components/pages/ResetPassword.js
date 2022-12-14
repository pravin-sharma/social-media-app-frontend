import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { error, clearError, trigger, resetPassword, clearTrigger } =
    useContext(authContext);
  const { setAlert } = useContext(alertContext);

  const [formData, setFormData] = useState({
    email: "",
    resetPasswordToken: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { email, resetPasswordToken, newPassword, confirmNewPassword } =
    formData;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (trigger) {
      setAlert(`Password Reset Completed, Try tp login now`, "success");
      clearTrigger();
      navigate('/login');
    }
  }, [trigger]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onChangeHandle = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    resetPassword(formData);
  };

  const onClickBackHandle = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="container mt-2 mt-md-4">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 border border-2 rounded p-3 pb-5">
            <div className="row mb-2 align-items-center">
              <button
                className="col-1 p-1 m-2 btn btn-danger"
                onClick={onClickBackHandle}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
            <div className="row text-center align-items-center justify-content-center">
              <h3 className="row justify-content-center mb-3">
                Password Reset
              </h3>
              <form className="col-8" onSubmit={onSubmitHandle}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={onChangeHandle}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="resetPasswordToken"
                    placeholder="resetPasswordToken"
                    name="resetPasswordToken"
                    value={resetPasswordToken}
                    onChange={onChangeHandle}
                    required
                  />
                  <label htmlFor="resetPasswordToken">
                    Reset Password Token
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChangeHandle}
                    required
                  />
                  <label htmlFor="newPassword">New Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    placeholder="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChangeHandle}
                    required
                  />
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                </div>

                <button className="btn btn-primary btn-lg" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
