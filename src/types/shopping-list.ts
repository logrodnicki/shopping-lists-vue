import { Units } from '@/types/units';

export interface ShoppingList {
  id: number;
  attributes: ShoppingListAttributes;
}

export interface ShoppingListAttributes {
  name: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: {
    data: Product[];
  };
}

export interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductAttributes {
  name: string;
  unit: Units;
  amount: number;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface SaveProductData extends Partial<ProductAttributes> {
  shopping_list: number;
}
