import { authAction } from "../reducers/auth";
import * as api from "../../api/index";

export const authAsync = (data) => async (dispatch) => {
  try {
    dispatch(authAction.auth(data));
  } catch (error) {
    console.log(error);
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(authAction.logout());
  } catch (error) {
    console.log(error);
  }
};

export const signinAsync = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);

    dispatch(authAction.auth(data));

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signupAsync = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);

    dispatch(authAction.auth(data));

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
