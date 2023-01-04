import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import adminContext from "../../context/admin/adminContext";
import alertContext from "../../context/alert/alertContext";
import UserItem from "./UserItem";

const AdminAllUsersContainer = () => {
  const { setAlert } = useContext(alertContext);
  const { users, getUsers } = useContext(adminContext);

  useEffect(() => {
    getUsers();
    console.log('user container rendered')
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="col-12 col-xl-10">
        {users.length
          ? users.map((user) => <UserItem user={user} key={user._id} />)
          : "No Users Found"}
      </div>
    </div>
  );
};

export default AdminAllUsersContainer;
