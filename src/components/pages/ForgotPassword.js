import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { error, clearError, forgotPassword, trigger, clearTrigger } =
    useContext(authContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (trigger) {
      setAlert(`Email Sent to ${email}`, "success");
      clearTrigger();
    }
  }, [trigger]);

  const [email, setEmail] = useState("");

  const onChangeHandle = (event) => {
    setEmail(event.target.value);
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    forgotPassword(email);
  };

  const onClickBackHandle = () => {
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="container text-center mt-2 mt-md-4">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 border border-2 rounded p-3 pb-5">
            <div className="row mb-2">
              <button
                className="col-1 p-1 m-2 btn btn-danger"
                onClick={onClickBackHandle}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
            <div className="row align-items-center justify-content-center">
              <form className="col-8" onSubmit={onSubmitHandle}>
                <p className="bg-warning rounded p-1">
                <FontAwesomeIcon icon={faTriangleExclamation} /> We will
                  send you password reset url and secret token at your
                  registered email address. Kindly enter your registered email
                  address.
                </p>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChangeHandle}
                    placeholder="Email Address"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
