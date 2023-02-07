import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import axios from 'axios';
import {
  Product,
  ProductAttributes,
  SaveProductData,
  ShoppingList,
  ShoppingListAttributes
} from '@/types';
import router from '@/router';

// @ts-ignore
export const getUrl = (path: string) =>
  `${import.meta.env['VITE_HOST']}/${path}`;

export const API_URL = 'api';
export const LOGIN_URL = `${API_URL}/auth/local`;
export const SHOPPING_LISTS_URL = `${API_URL}/shopping-lists`;
export const PRODUCTS_URL = `${API_URL}/products`;

const token = Cookies.get(JWT_TOKEN_KEY);

export const makeGetRequest = async <T>(url: string) => {
  try {
    return await axios.get<T>(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    if (error.response.status === 401) {
      await router.push({ name: 'Login' });
    }

    throw Error(error.toString());
  }
};

export const makePostRequest = async <T, G>(url: string, data: { data: T }) => {
  try {
    return await axios.post<G>(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    if (error.response.status === 401) {
      await router.push({ name: 'Login' });
    }

    throw Error(error.toString());
  }
};

export const makePutRequest = async <T, G>(url: string, data: { data: T }) => {
  try {
    return await axios.put<G>(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    if (error.response.status === 401) {
      await router.push({ name: 'Login' });
    }

    throw Error(error.toString());
  }
};

export const makeDeleteRequest = async <T>(url: string) => {
  try {
    return await axios.delete<T>(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    if (error.response.status === 401) {
      await router.push({ name: 'Login' });
    }

    throw Error(error.toString());
  }
};

export const getShoppingLists = async () => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest(
    `${getUrl(SHOPPING_LISTS_URL)}?${urlParams.toString()}`
  );
};

export const updateShoppingList = async (
  id: number,
  data: Partial<ShoppingListAttributes>
) => {
  return await makePutRequest<
    Partial<ShoppingListAttributes>,
    { data: ShoppingList }
  >(`${getUrl(SHOPPING_LISTS_URL)}/${id}`, { data });
};

export const getShoppingList = async (id: number) => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');

  return await makeGetRequest<{ data: ShoppingList }>(
    `${getUrl(SHOPPING_LISTS_URL)}/${id}?${urlParams.toString()}`
  );
};

export const updateProduct = async (
  id: number | string,
  data: ProductAttributes
) => {
  return await makePutRequest<ProductAttributes, { data: Product }>(
    `${getUrl(PRODUCTS_URL)}/${id}`,
    { data }
  );
};

export const saveShoppingList = async (
  shoppingList: Partial<ShoppingListAttributes>
) => {
  return await makePostRequest<
    Partial<ShoppingListAttributes>,
    { data: ShoppingList }
  >(getUrl(SHOPPING_LISTS_URL), {
    data: shoppingList
  });
};

export const saveProduct = async (
  shoppingListProduct: Partial<ProductAttributes>,
  shoppingListId: number
) => {
  return await makePostRequest<SaveProductData, { data: Product }>(
    getUrl(PRODUCTS_URL),
    {
      data: { ...shoppingListProduct, shopping_list: shoppingListId }
    }
  );
};

export const deleteProduct = async (id: number | string) => {
  return await makeDeleteRequest<{ data: Product }>(
    `${getUrl(PRODUCTS_URL)}/${id}`
  );
};
