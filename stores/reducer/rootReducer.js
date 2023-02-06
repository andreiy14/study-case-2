import { combineReducers } from "redux";
import daftar from "./daftar";
import login from "./login";
import dataPegawai from "./dataPegawai";
const rootReducer = combineReducers({
  daftar,
  login,
  dataPegawai,
});

export default rootReducer;
