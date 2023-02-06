import { SET_DATA, SET_LOADING, INIT_DATA, SET_SUCCESS } from "../action/login";

const initialState = {
  isLoading: false,
  data: {},
  isSuccess: false,
};

const login = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case INIT_DATA:
      return {
        ...initialState,
      };

    case SET_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        isSuccess: payload,
      };
    default:
      return state;
  }
};
export default login;
