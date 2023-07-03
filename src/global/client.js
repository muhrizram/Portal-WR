import axios from "axios";
import { useAuth } from "react-oidc-context";
// import useasuth

const instance = axios.create();
const auth = useAuth();

export const clientState = {
  requesting: false,
};

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
const requestAPI = async ({
  method = "GET",
  endpoint,
  data,
  headers,
  otherConfig,
  isToken = true,
}) => {
  let result = {};
  const host = process?.env?.REACT_APP_AUTH;
  const url = `${host}${endpoint}`;
  const timeout = process?.env?.REACT_APP_DEFAULT_TIMEOUT;
  const token = auth.user.access_token;
  let optHeaders = { ...headers, "Access-Control-Allow-Origin": "*" };
  if (isToken) optHeaders = { ...optHeaders, Authorization: `Bearer ${token}` };
  const reqConfig = {
    url,
    method,
    timeout,
    headers: optHeaders,
    data,
    ...otherConfig,
  };
  if (!endpoint) throw new Error("url parameter is required");

  // Set Fetching State
  clientState.requesting = true;

  try {
    const apiResponse = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = new Error("Request Timeout");
        error.code = "E_REQUEST_TIMOUT";
        error.message = `Request Timout for ${timeout}  ms`;
        reject(error);
      }, timeout);
      try {
        const res = axios.request(reqConfig);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
    result = apiResponse.data;

    // Remove Fetching State
    clientState.requesting = false;

    return result;
  } catch (error) {
    // Remove Fetching State
    clientState.requesting = false;
    if (error?.response?.status === 401) {
      localStorage.clear();
      localStorage.setItem("isExpired", true);
      window.location.reload();
    }

    result = { status: error?.response?.status, error: error?.response?.data };
    return result;
  }
};

export default {
  requestAPI,
};
