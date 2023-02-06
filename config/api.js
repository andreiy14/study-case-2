import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: "https://klinikme-test-api.herokuapp.com/",
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    console.warn("works");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};
