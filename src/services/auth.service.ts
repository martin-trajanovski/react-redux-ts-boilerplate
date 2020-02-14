import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import axiosInstance from 'src/axios';
import { LoginFormData } from 'src/components/Login';
import { RegisterFormData } from 'src/components/Register';
import { history } from 'src/helpers/history';
import { TokenDataInterface, AuthorizationHeader } from 'src/interfaces';

const skipAuthRefreshConfig: AxiosAuthRefreshRequestConfig = {
  skipAuthRefresh: true,
};

const getToken = (): TokenDataInterface => {
  // TODO: This user might me renamed with auth or something...
  const storedToken = localStorage.getItem('user');
  let token = null;

  if (typeof storedToken === 'string') {
    token = JSON.parse(storedToken);
  }

  return token;
};

// TODO: Review this logic!!! This should be simplified and validated better together with getToken.
const getAuthHeader = (): AuthorizationHeader => {
  const user = getToken();
  const header = { Authorization: 'Bearer ' };

  if (user && user.authToken) {
    header.Authorization += user.authToken.token;
  }

  return header;
};

const register = async (
  data: RegisterFormData
): Promise<TokenDataInterface> => {
  const requestOptions = {
    body: data,
  };

  try {
    const { data } = await axiosInstance.post(
      '/auth/register',
      requestOptions.body,
      skipAuthRefreshConfig
    );

    history.push('/login');

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error.message;
    }
  }
};

const login = async (data: LoginFormData): Promise<TokenDataInterface> => {
  const requestOptions = {
    body: data,
  };

  try {
    const { data } = await axiosInstance.post(
      '/auth/login',
      requestOptions.body,
      skipAuthRefreshConfig
    );

    localStorage.setItem('user', JSON.stringify(data));

    // TODO: Might need to save the previous route and go there.
    history.push('/');

    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error.message;
    }
  }
};

const logout = async (): Promise<boolean> => {
  const { refreshToken } = getToken();

  if (!refreshToken) {
    localStorage.removeItem('user');

    history.push('/login');

    return true;
  }

  try {
    await axiosInstance.post(
      '/auth/logout',
      { refreshToken },
      skipAuthRefreshConfig
    );
    localStorage.removeItem('user');

    history.push('/login');

    return true;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (): Promise<boolean> => {
  // store.dispatch({ type: authConstants.REFRESHING_TOKEN });

  try {
    const { refreshToken } = getToken();

    const { data } = await axiosInstance.post(
      '/auth/refreshToken',
      {
        refreshToken,
      },
      skipAuthRefreshConfig
    );

    const user = getToken();
    user.authToken = data.authToken;
    localStorage.setItem('user', JSON.stringify(user));

    // store.dispatch({ type: authConstants.TOKEN_REFRESHED });

    return true;
  } catch (error) {
    logout();

    return error;
  }
};

const isAuthenticated = (): boolean => {
  // FIXME: This is not a good check if user is authenticated or not.
  const token = getToken();
  const isValidToken = !!token && !!token.authToken;

  return isValidToken;
};

export const authService = {
  register,
  login,
  logout,
  refreshToken,
  isAuthenticated,
  getAuthHeader,
};
