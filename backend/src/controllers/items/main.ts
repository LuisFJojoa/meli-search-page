import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { AvailableFilter, AvailableFilterValue, IItemDescriptionFromMeliResponse, IItemsReponseFromMeliAPI, Result } from '@/contracts/types/meli/items/main.js';
import { IItemDetail, IItemDetailsByIdResponse, IItemFromQueryParams, IItemsByQueryParamsResponse } from '@/contracts/types/backend/items/main.js';
import { ICategoryResponseFromMeliAPI, IPathFromRoot } from '@/contracts/types/meli/category/main.js';
import { AUTHOR } from '@/consts/main.js';
import { mapItemFromMeliApiToItem, mapItemsFromMeliApiToItem } from '@/utils/main.js';

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    let results: Result[] = [];
    let categories: string[] = [];
    let available_filters: AvailableFilter[];
    let mostCommonCategory: AvailableFilterValue = {} as AvailableFilterValue;

    try {
      const itemsResponse: AxiosResponse<IItemsReponseFromMeliAPI> = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
      );

      results = itemsResponse.data.results.slice(0, 4);
      available_filters = itemsResponse.data.available_filters;
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({ error: 'Error fetching items from all items by query param: ' + (error.response.data.message || 'Unknown error') });
      } else {
        return res.status(500).json({ error: 'Error fetching items from all items by query param:: An unexpected error occurred' });
      }
    }

    const items: IItemFromQueryParams[] = mapItemsFromMeliApiToItem(results);

    try {

      mostCommonCategory = available_filters.find((filter: AvailableFilter) => filter.id === 'category')?.values
        .reduce((prev: AvailableFilterValue, current: AvailableFilterValue) =>
          (current.results > prev.results ? current : prev)) as AvailableFilterValue;

      const categoryResponse: AxiosResponse<ICategoryResponseFromMeliAPI> = await axios.get(
        `https://api.mercadolibre.com/categories/${mostCommonCategory.id}`
      );

      categories = categoryResponse.data.path_from_root.map(
        (category: IPathFromRoot) => category.name
      ) || [];
    } catch (error) {
      console.error({ error: 'Error fetching categories to render breadcrumb: ' + (error || 'Unknown error') });
    }

    const itemsByQueryParams: IItemsByQueryParamsResponse = {
      author: AUTHOR,
      categories: categories.length !== 0 ? categories : [mostCommonCategory.name],
      items
    };

    res.json({
      data: itemsByQueryParams
    });
  } catch (error) {
    next(error);
  }
};


export const getItemDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const id = req.params.id;
  try {
    let item: IItemDetail;
    try {
      const itemResponse: AxiosResponse<Result> = await axios.get(`https://api.mercadolibre.com/items/${id}`);
      item = mapItemFromMeliApiToItem(itemResponse.data);
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({ error: 'Error fetching item: ' + (error.response.data.message || 'Unknown error') });
      } else {
        return res.status(500).json({ error: 'Error fetching item: An unexpected error occurred' });
      }
    }

    try {
      const descriptionResponse: AxiosResponse<IItemDescriptionFromMeliResponse> = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
      item.description = descriptionResponse.data.plain_text;
    } catch (error) {
      if (error.response) {
        console.error({ error: `Error fetching item description: An unexpected error occurred` });
      } else {
        return res.status(500).json({ error: 'Error fetching item: An unexpected error occurred' });
      }
    }

    const itemDetailsResponse: IItemDetailsByIdResponse = {
      author: AUTHOR,
      item
    };

    res.json({
      data: itemDetailsResponse
    });
  } catch (error) {
    next(error);
  }

};