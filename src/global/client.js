import axios from "axios";
// import { useAuth } from "react-oidc-context";
// import useasuth

const instance = axios.create();
// const auth = useAuth()

const refreshToken = async (Token) => {
  try {    
    const host = process.env.REACT_APP_BASE_API;
    const refreshTokenEndpoint = `${host}/auth/refreshToken`;
    const response = await axios.post(refreshTokenEndpoint, {
      refreshToken: Token,
    });
    console.log("REFRESH RESPONSE", response)
    if (response.status === 200) {      
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshtoken', response.data.refreshToken);
      return true;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
};


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
  isLogin = false,
  // otherConfig,
  // isToken = true,
}) => {  
  let result = {};
  const host = process.env.REACT_APP_BASE_API;
  const url = `${host}${endpoint}`;
  const timeout = process.env.REACT_APP_DEFAULT_TIMEOUT;
  const token = localStorage.getItem('token')
  let optHeaders = {
    ...headers,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json"
  };
  if (!isLogin) optHeaders = { ...optHeaders, Authorization: `Bearer ${token}` };
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
      const refreshTokennya = localStorage.getItem('refreshtoken');
      const refreshTokenSuccess = await refreshToken(refreshTokennya);
      if (refreshTokenSuccess) {        
        return requestAPI({ method, endpoint, data, headers });
      }

    // Remove Fetching State
    clientState.requesting = false;
    result = { status: error.response.status, error: error.response.data, isError: true };
    return result;
  }
};

export default {
  requestAPI,
};
