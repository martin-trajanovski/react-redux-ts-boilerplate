import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { authService } from 'src/services';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = authService.getAuthHeader().Authorization;

    return config;
  },
  error => {
    return error;
  }
);

// Function that will be called to refresh authorization
const refreshAuthLogic = (): Promise<boolean> => authService.refreshToken();

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
