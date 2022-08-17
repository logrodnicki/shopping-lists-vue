import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import axios from 'axios';
import { ProductAttributes, ShoppingListAttributes } from '@/types';

export const getUrl = (path: string) => `${import.meta.env['VITE_HOST']}/${path}`;

export const API_URL = 'api';
export const LOGIN_URL = `${API_URL}/auth/local`;
export const SHOPPING_LISTS_URL = `${API_URL}/shopping-lists`;
export const PRODUCTS_URL = `${API_URL}/products`;

const token = Cookies.get(JWT_TOKEN_KEY);

export const makeRequest = async <T>({
  url,
  method,
  data
}: {
  url: string;
  method: string;
  data?: { data: T };
}) => {
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

export const makeGetRequest = async (url: string) => {
  return await makeRequest({ url, method: 'GET' });
};

export const makePostRequest = async <T>(url: string, data: { data: T }) => {
  return await makeRequest<T>({ url, method: 'POST', data });
};

export const makePutRequest = async <T>(url: string, data: { data: T }) => {
  return await makeRequest({ url, method: 'PUT', data });
};

export const getShoppingLists = async () => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest(`${getUrl(SHOPPING_LISTS_URL)}?${urlParams.toString()}`);
};

export const updateShoppingList = async (id: number, data: Partial<ShoppingListAttributes>) => {
  return await makePutRequest<Partial<ShoppingListAttributes>>(
    `${getUrl(SHOPPING_LISTS_URL)}/${id}`,
    { data }
  );
};

export const getShoppingList = async (id: number) => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest(`${getUrl(SHOPPING_LISTS_URL)}/${id}?${urlParams.toString()}`);
};

export const updateShoppingListProduct = async (id: number, data: ProductAttributes) => {
  return await makePutRequest<ProductAttributes>(`${getUrl(PRODUCTS_URL)}/${id}`, { data });
};
