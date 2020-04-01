import api from 'api';

import { convertFormToPost } from 'store/models/auth/utils';

export default {
  async get(): Promise<IAuth> {
    try {
      const response: IApiResponse = await api.get('auth');

      return Promise.resolve(response.data as IAuth);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async post(data: IAuthForm): Promise<IAuth> {
    try {
      const auth = convertFormToPost(data);

      const response: IApiResponse = await api.post('auth', auth);

      return Promise.resolve(response.data as IAuth);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async delete(): Promise<void> {
    try {
      await api.delete('auth');

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
