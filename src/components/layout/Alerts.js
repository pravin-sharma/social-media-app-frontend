import { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.forEach((alert) => {
      switch (alert.type) {
        case "danger":
          toast.error(alert.msg);
          break;
        case "success":
          toast.success(alert.msg);
          break;
        case "warning":
          toast.warn(alert.msg);
          break;
        default:
          alert(alert.msg);
      }
    })
  );
};
