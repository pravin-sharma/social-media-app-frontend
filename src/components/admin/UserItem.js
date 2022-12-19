import { faCircleCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import adminContext from "../../context/admin/adminContext";

const UserItem = ({ user }) => {
  const navigate = useNavigate();
  const { _id, name, profilePicUrl, isVerified, isDisabled } = user;
  const { enableUser, disableUser, deleteUser } = useContext(adminContext);

  const onEnableClick = () => {
    enableUser(_id);
  };

  const onDisableClick = () => {
    disableUser(_id);
  };

  const onDeleteClick = () => {
    deleteUser(_id);
  };

  return (
    <div className="d-flex flex-column bg-white p-2 rounded shadow mt-1">
      {/* Header */}
      <div className="d-flex">
        <img
          className="rounded-5"
          src={profilePicUrl}
          alt="profile"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div className="d-flex flex-column ms-2">
          <div
            className="text-capitalize"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile/${_id}`)}
          >
            {name}
          </div>
          {isVerified ? (
            <div className="me-auto badge rounded-pill bg-success bg-opacity-75">
              verified
            </div>
          ) : (
            <div className="me-auto badge rounded-pill bg-secondary bg-opacity-75">
              unverified
            </div>
          )}
        </div>
        <div className="ms-auto d-flex flex-column align-items-center">
          {/* Enable/Disable User */}
          {isDisabled ? (
            // Enable user
            <div
              className="btn btn-success btn-sm"
              onClick={() => onEnableClick()}
            >
              <FontAwesomeIcon icon={faCircleCheck}/> Enable user
            </div>
          ) : (
            // Disable user
            <div
              className="btn btn-warning text-light  btn-sm"
              onClick={() => onDisableClick()}
            >
              <FontAwesomeIcon icon={faBan}/> Disable user
            </div>
          )}

          <div
            className="btn btn-danger btn-sm w-100 mt-1"
            onClick={() => onDeleteClick()}
          >
            <FontAwesomeIcon icon={faTrashCan}/> Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
