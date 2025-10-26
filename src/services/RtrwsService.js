/* eslint-disable no-unused-vars */
import { Rtrws } from '@/models';
import api from '@/utils/api';

export default class RtrwsService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Rtrws[];
   * }>}
   * */
  static async getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/rtrw', { token, params });
    if (!response.data) return response;
    return { ...response, data: Rtrws.fromApiData(response.data) };
  }

  /**
   * @param {Rtrws} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token, file) {
    const payload = {
      body: Rtrws.toApiData(data),
      token
    };
    if (file) {
      payload.file = { dokumen_file: file };
    }
    return await api.post('/rtrw', { ...payload });
  }

  /**
   * @param {number} id
   * @param {Rtrws} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token, file) {
    return await api.post(`/rtrw/${id}`, { body: Rtrws.toApiData(data), token, file: { dokumen_file: file } });
  }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/rtrw/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/rtrw/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
