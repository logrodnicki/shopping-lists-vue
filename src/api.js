import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import axios from 'axios';

export const getUrl = path => `${import.meta.env['VITE_HOST']}/${path}`;

export const API_URL = 'api';
export const LOGIN_URL = `${API_URL}/auth/local`;
export const SHOPPING_LISTS_URL = `${API_URL}/shopping-lists`;

const token = Cookies.get(JWT_TOKEN_KEY);

export const makeRequest = async ({ url, method, data }) => {
  try {
    return await axios({
      method,
      url,
      headers: { Authorization: `Bearer ${token}` },
      data
    });
  } catch (error) {
    console.log(error);
  }
};

export const makeGetRequest = async url => {
  return makeRequest({ url, method: 'GET' });
};

export const getShoppingLists = async () => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return makeGetRequest(`${getUrl(SHOPPING_LISTS_URL)}?${urlParams.toString()}`);
};
