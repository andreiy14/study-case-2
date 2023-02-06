import axios from "axios";
export const SET_LOADING = "login/SET_LOADING";
export const SET_SUCCESS = "login/SET_SUCCESS";
export const SET_DATA = "login/SET_DATA";
export const INIT_DATA = "login/INIT_DATA";

export const setData = (payload) => ({
  type: SET_DATA,
  payload,
});
export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
export const setSuccessConfirmation = (payload) => ({
  type: SET_SUCCESS,
  payload,
});

export const handleLogin = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://klinikme-test-api.herokuapp.com/api/v1/data_user/masuk",
      {
        Email: payload?.email,
        Password: payload?.password,
      }
    );

    dispatch(setLoading(false));

    if (response.status === 200) {
      dispatch(setSuccessConfirmation(true));
      localStorage.setItem("dataLogin", JSON.stringify(response.data.data));
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      // dispatch(setData(response.data));
      console.log(response);
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};
