import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";


const EmailVerification = (props) => {
  //get email address from location prop

  const navigate = useNavigate();

  const { verifyEmail, isVerified, clearIsVerifiedState, error, clearError } =
    useContext(authContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    if (isVerified) {
      navigate("/login");
      clearIsVerifiedState();
      setAlert("Email is verified. Proceed to Login", "success");
    }
  }, [isVerified]);

  const [verificationCode, setVerificationCode] = useState("");

  const onChangeHandle = (event) => {
    setVerificationCode(event.target.value);
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    verifyEmail(verificationCode);
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
                <FontAwesomeIcon icon={faTriangleExclamation} /> We have sent
                  you a mail with a verification code. Please enter that code
                  below.
                </p>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    name="verificationCode"
                    value={verificationCode}
                    onChange={onChangeHandle}
                    placeholder="Verification Code"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Verify
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

export default EmailVerification;
