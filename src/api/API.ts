//create axios instance
import axios from "axios";
import AuthService from "../services/AuthService";
import endPoints from "./endpoints";

const API = axios.create({
  baseURL: `${endPoints.serverBaseURL}/api/v1`,
});

// aToken Authentication
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("aToken");

  if (token) req?.headers && (req.headers["Authorization"] = token);

  return req;
});

// aToken Refresh
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    //Destroy the Session
    if (err?.response?.status === 408) {
      const response = await AuthService.refreshToken();
      if (response?.status === 200) {
        const { accessToken, refreshToken } = response?.data?.data;

        sessionStorage.setItem("aToken", accessToken);
        sessionStorage.setItem("rToken", refreshToken);

        return Promise.resolve({ message: "Tokens Refreshed", data: response });
      } else {
        return Promise.reject({ message: "Try Again", error: null });
      }
    } else if (err?.response?.status === 403) {
      // Destroy the Session
      sessionStorage.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default API;
