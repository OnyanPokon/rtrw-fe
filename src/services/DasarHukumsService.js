/* eslint-disable no-unused-vars */
import { DasarHukums } from '@/models';
import api from '@/utils/api';

export default class DasarHukumsService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: DasarHukums[];
   * }>}
   * */
  static async getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/dasar_hukum', { token, params });
    if (!response.data) return response;
    return { ...response, data: DasarHukums.fromApiData(response.data) };
  }

  /**
   * @param {DasarHukums} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token, file) {
    return await api.post('/dasar_hukum', { body: DasarHukums.toApiData(data), token, file: { file_dokumen: file } });
  }

  /**
   * @param {number} id
   * @param {DasarHukums} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token, file) {
    return await api.post(`/dasar_hukum/${id}`, { body: DasarHukums.toApiData(data), token, file: { file_dokumen: file } });
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
    return await api.delete(`/dasar_hukum/${id}`, { token });
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
    return await api.delete(`/dasar_hukum/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
