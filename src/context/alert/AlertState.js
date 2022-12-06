import { useReducer } from "react";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 } from "uuid";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 0) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { id, msg, type } });
    // Remove Alert
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
