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
  unit: string;
  amount: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
