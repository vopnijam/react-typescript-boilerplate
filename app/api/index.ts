import { store } from 'app';
import axios, { AxiosResponse } from 'axios';

import { config } from 'constants/config';
import { generateToast } from 'utils/generate';

import { authDeleteSuccessAction } from 'store/models/auth/actions';

import {
  decrementLoading,
  incrementLoading,
  notify,
} from 'store/containers/app/actions';

const notifyError = (error: IErrorResponse) => {
  if (error.response) {
    store.dispatch(notify(generateToast(
      error.response.data.message,
      'Error',
    )));
  } else if (error.message === 'Network Error') {
    store.dispatch(notify(generateToast(
      'We\'re having some trouble connecting. Please check your internet connection and try again.',
      'Error',
    )));
  } else {
    store.dispatch(notify(generateToast(
      'Sorry your request could not be completed. Please try again later.',
      'Error',
    )));
  }
};

const logout = () => {
  store.dispatch(authDeleteSuccessAction());

  if (!window.location.pathname.startsWith('/login')) {
    window.location.replace('/login');
  }
};

export default {
  async get(endPoint: string, data?: IGenericObject): Promise<IApiResponse> {
    try {
      store.dispatch(incrementLoading());
      const response: AxiosResponse = await axios.get(
        `${process.env.API_ENDPOINT}/${endPoint}`, { params: data, withCredentials: true },
      );
      store.dispatch(decrementLoading());

      return Promise.resolve({ data: response.data });
    } catch (error) {
      store.dispatch(decrementLoading());

      // If we're making an auth call anyways, we will be handling redirect already.
      if (error.response && error.response.status === 401 && endPoint !== 'auth') {
        logout();
      }

      if (!config.nonErrorApiCalls.get.includes(endPoint)) {
        notifyError(error);
      }

      return Promise.reject(error);
    }
  },

  async post(endPoint: string, data?: IGenericObject): Promise<IApiResponse> {
    try {
      store.dispatch(incrementLoading());
      const response: AxiosResponse = await axios.post(
        `${process.env.API_ENDPOINT}/${endPoint}`, data, {withCredentials: true},
      );
      store.dispatch(decrementLoading());

      return Promise.resolve({ data: response.data });
    } catch (error) {
      store.dispatch(decrementLoading());

      if (error.response && error.response.status === 401) {
        logout();
      }

      if (!config.nonErrorApiCalls.post.includes(endPoint)) {
        notifyError(error);
      }

      return Promise.reject(error);
    }
  },

  async patch(endPoint: string, data?: IGenericObject): Promise<IApiResponse> {
    try {
      store.dispatch(incrementLoading());
      const response: AxiosResponse = await axios.patch(
        `${process.env.API_ENDPOINT}/${endPoint}`, data, {withCredentials: true},
      );
      store.dispatch(decrementLoading());

      return Promise.resolve({ data: response.data });
    } catch (error) {
      store.dispatch(decrementLoading());

      if (error.response && error.response.status === 401) {
        logout();
      }

      if (!config.nonErrorApiCalls.patch.includes(endPoint)) {
        notifyError(error);
      }

      return Promise.reject(error);
    }
  },

  async delete(endPoint: string, data?: IGenericObject): Promise<IApiResponse> {
    try {
      store.dispatch(incrementLoading());
      const response: AxiosResponse = await axios.delete(
        `${process.env.API_ENDPOINT}/${endPoint}`, { data, withCredentials: true },
      );
      store.dispatch(decrementLoading());

      return Promise.resolve({ data: response.data });
    } catch (error) {
      store.dispatch(decrementLoading());

      // If the call is to delete the auth token, we can get in a recursive loop
      // Example: Already logged out and lands on customers page. Get fails so
      // logout gets called. Logout fails because not authorized and loop starts.
      if (error.response && error.response.status === 401 && endPoint !== 'auth') {
        logout();
      }

      if (!config.nonErrorApiCalls.delete.includes(endPoint)) {
        notifyError(error);
      }

      return Promise.reject(error);
    }
  },
};
