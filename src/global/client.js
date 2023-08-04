import axios from "axios";
// import { useAuth } from "react-oidc-context";
// import useasuth

const instance = axios.create();
// const auth = useAuth()


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
  // otherConfig,
  // isToken = true,
}) => {
  let result = {};
  const host = process.env.REACT_APP_BASE_API;
  const url = `${host}${endpoint}`;
  const timeout = process.env.REACT_APP_DEFAULT_TIMEOUT;
  // const token = auth.user.access_token
  let optHeaders = {
    ...headers,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  // if (isToken) optHeaders = { ...optHeaders, Authorization: `Bearer ${token}` };
  // const reqConfig = { url, method, timeout, headers: optHeaders, data, ...otherConfig };

  const reqConfig = { url, method, timeout, headers: optHeaders, data };
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
    result = {...apiResponse.data, isError: false};

    // Remove Fetching State
    clientState.requesting = false;

    return result;
  } catch (error) {
    // Remove Fetching State
    clientState.requesting = false;
    result = { status: error.response.status, error: error.response.data, isError: true };
    return result;
  }
};

export default {
  requestAPI,
};
