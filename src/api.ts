import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@/consts';
import axios, { Method } from 'axios';
import {
  FiltersType,
  Product,
  ProductAttributes,
  SaveProductData,
  SelectedFilters,
  ShoppingList,
  ShoppingListAttributes
} from '@/types';
import router, { RoutesNames } from '@/router';

export const getUrl = (path: string) =>
  `${import.meta.env['VITE_HOST']}/${path}`;

export const API_URL = 'api';
export const LOGIN_URL = `${API_URL}/auth/local`;
export const SHOPPING_LISTS_URL = `${API_URL}/shopping-lists`;
export const PRODUCTS_URL = `${API_URL}/products`;

const makeRequest = async <T, G>(
  url: string,
  method: Method,
  data?: { data: G }
) => {
  const token = Cookies.get(JWT_TOKEN_KEY);

  try {
    return await axios({
      url,
      method,
      headers: { Authorization: `Bearer ${token}` },
      data
    });
  } catch (error) {
    if (error.response.status === 401) {
      Cookies.remove(JWT_TOKEN_KEY);
      await router.push({ name: RoutesNames.LOGIN });
    }

    throw Error(error.toString());
  }
};

export const makeGetRequest = async <T>(url: string) => {
  return makeRequest<T, undefined>(url, 'GET');
};

export const makePostRequest = async <T, G>(url: string, data: { data: T }) => {
  return makeRequest<G, T>(url, 'POST', data);
};

export const makePutRequest = async <T, G>(url: string, data: { data: T }) => {
  return makeRequest<G, T>(url, 'PUT', data);
};

export const makeDeleteRequest = async <T>(url: string) => {
  return makeRequest<T, undefined>(url, 'DELETE');
};

export const getShoppingLists = async <T>(
  filters: SelectedFilters,
  page: number,
  pageSize: number
) => {
  const urlParams = new URLSearchParams();

  urlParams.set('populate', '*');
  urlParams.set('pagination[pageSize]', String(pageSize));
  urlParams.set('pagination[page]', String(page));

  if (filters.type !== FiltersType.ALL) {
    if (filters.type === FiltersType.UNCOMPLETED) {
      urlParams.set('filters[completed][$eq]', 'false');
    }

    if (filters.type === FiltersType.COMPLETED) {
      urlParams.set('filters[completed][$eq]', 'true');
    }
  }

  return await makeGetRequest<T>(
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
