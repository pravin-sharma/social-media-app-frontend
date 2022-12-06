import axios from "axios";

const setTokenInHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["authorization"] = null;
  }
};

export default setTokenInHeader;
