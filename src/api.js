import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import axios from 'axios';

export const getUrl = path => `${import.meta.env['VITE_HOST']}/${path}`;

export const API_URL = 'api';
export const LOGIN_URL = `${API_URL}/auth/local`;
export const SHOPPING_LISTS_URL = `${API_URL}/shopping-lists`;
export const PRODUCTS_URL = `${API_URL}/products`;

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
  return await makeRequest({ url, method: 'GET' });
};

export const makePostRequest = async (url, data) => {
  return await makeRequest({ url, method: 'POST', data });
};

export const makePutRequest = async (url, data) => {
  return await makeRequest({ url, method: 'PUT', data });
};

export const getShoppingLists = async () => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest(`${getUrl(SHOPPING_LISTS_URL)}?${urlParams.toString()}`);
};

export const getShoppingList = async (id) => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest(`${getUrl(SHOPPING_LISTS_URL)}/${id}?${urlParams.toString()}`);
};

export const updateShoppingListProduct = async (id, data) => {
  return await makePutRequest(`${getUrl(PRODUCTS_URL)}/${id}`, { data });
};
