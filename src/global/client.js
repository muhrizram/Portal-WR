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
    if (response.status === 200) {
      window.location.reload();
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshtoken', response.data.refreshToken);      
      return true;
    }
  } catch (error) {
    console.error("Token Refresh Error: ", error.message);
    localStorage.clear();
    return false;
  }
};


export const clientState = {
  requesting: false,
  refreshingToken: false,
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
}) => {
  let result = {};
  const host = process.env.REACT_APP_BASE_API;
  const url = `${host}${endpoint}`;
  const timeout = process.env.REACT_APP_DEFAULT_TIMEOUT;
  const token = localStorage.getItem("token");
  let optHeaders = {
    ...headers,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  };
  if (!isLogin) optHeaders = { ...optHeaders, Authorization: `Bearer ${token}` };

  const reqConfig = { url, method, timeout, headers: optHeaders, data };
  if (!endpoint) throw new Error("Parameter url diperlukan");
  
  clientState.requesting = true;

  try {
    const apiResponse = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = new Error("Waktu Permintaan Habis");
        error.code = "E_REQUEST_TIMOUT";
        error.message = `Waktu Permintaan Habis selama ${timeout} ms`;
        reject(error);
      }, timeout);
      try {
        const res = axios.request(reqConfig);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
    result = { ...apiResponse.data, isError: false };
    
    clientState.requesting = false;

    return result;
  } catch (error) {
    if (error.response.status === 401) {
      if (!clientState.refreshingToken) { 
        clientState.refreshingToken = true;
        const refreshTokennya = localStorage.getItem("refreshtoken");
        const refreshTokenSuccess = await refreshToken(refreshTokennya);
        clientState.refreshingToken = false;
        console.log(refreshTokenSuccess)
        if (refreshTokenSuccess) {
          return await requestAPI({ method, endpoint, data, headers }); 
        }
      }
    }
    
    clientState.requesting = false;
    result = {
      status: error.response.status,
      error: error.response.data,
      isError: true,
    };
    return result;
  }
};

export default {
  requestAPI,
};