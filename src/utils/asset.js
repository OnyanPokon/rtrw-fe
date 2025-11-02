const baseUrl = import.meta.env.VITE_BASE_URL;

export const BASE_URL = baseUrl + '/storage/';

export default function asset(url) {
  return BASE_URL + url;
}
