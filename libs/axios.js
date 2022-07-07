import axios from "axios";
import { parseCookies } from "nookies";

const baseURL = "http://192.168.43.213:5050";

const axiosInstance = axios.create({
  baseURL,
});

const { _t: accessToken } = parseCookies();

axiosInstance.interceptors.request.use(function (config) {
  if (accessToken !== undefined) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const fetcher = (url, token) =>
  axiosInstance
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

export default axiosInstance;
