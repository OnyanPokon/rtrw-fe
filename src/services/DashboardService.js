import api from '@/utils/api';

export default class DashboardService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Dashboard[];
   * }>}
   * */
  static async getAll({ token }) {
    const response = await api.get('/summary', { token });
    if (!response.data) return response;
    return { ...response, data: response.data };
  }
}
