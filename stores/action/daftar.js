import axios from "axios";
export const SET_LOADING = "daftar/SET_LOADING";
export const SET_DATA = "daftar/SET_DATA";
export const INIT_DATA = "daftar/INIT_DATA";
export const SET_SUCCESS = "login/SET_SUCCESS";

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

export const handleRegis = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://klinikme-test-api.herokuapp.com/api/v1/data_user/daftar ",
      {
        Email: payload?.email,
        Username: payload?.userName,
        Password: payload?.password,
      }
    );

    dispatch(setLoading(false));

    if (response.status === 200) {
      dispatch(setSuccessConfirmation(true));

      // dispatch(setData(response.data));
      console.log(response);
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};
