import api from 'api';

export default {
  async gets(): Promise<INotification[]> {
    try {
      const response: IApiResponse = await api.get('notifications');

      return Promise.resolve(response.data.notifications as INotification[]);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async patch(data: INotification): Promise<INotification> {
    try {
      const id = data.id;

      const response: IApiResponse = await api.patch(
        `notifications/${id}`, { status: data.status },
      );

      return Promise.resolve(response.data as INotification);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async delete(data: INotification): Promise<void> {
    try {
      const id = data.id;
      await api.delete(`notifications/${id}`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
