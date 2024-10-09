import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (type, mesg) => {
  if (type === "success") {
    toast.success(mesg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "toastPosition",
    });
  }
  if (type === "error") {
    toast.error(mesg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "toastPosition",
    });
  }
};
