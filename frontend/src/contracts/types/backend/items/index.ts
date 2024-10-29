import { IAuthor } from "../author/main.js";

export interface IItemFromQueryParams {
  id: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  title: string;
}

export interface IItemDetail extends IItemFromQueryParams{
  categories?: string[];
  description: string
  sold_quantity?: number
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IItemsByQueryParamsResponse {
  author: IAuthor;
  categories: string[];
  items: IItemFromQueryParams[];
}

export interface IItemDetailsByIdResponse {
  author: IAuthor
  item: IItemDetail
}