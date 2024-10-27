import { IAuthor } from "../author/main.js";

export interface IItem {
  id: string;
  title: string;
  categories: string[];
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  description: string
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IItemsByQueryParamsResponse {
  author: IAuthor;
  categories: string[];
  items: IItem[];
}