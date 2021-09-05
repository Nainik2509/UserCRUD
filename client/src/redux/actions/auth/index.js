import API from "../../api";
import { toast } from "react-toastify";
import { history } from "../../../history";

// ** API to Loggin User
export const login = (loginData) => {
  return async (dispatch) => {
    await API.post("api/v1/auth/login", loginData)
      .then((response) => {

        localStorage.setItem("token", response.data.data.token);

        toast.success("Logged in sucessfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        dispatch({ type: "LOGIN", data: response.data.data });
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Authentication Failed", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };
};
