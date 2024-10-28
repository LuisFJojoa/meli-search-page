import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { AvailableFilter, AvailableFilterValue, IItemDescriptionFromMeliResponse, IItemsReponseFromMeliAPI, Result } from '@/contracts/types/meli/items/main.js';
import { IItemDetail, IItemDetailsByIdResponse, IItemFromQueryParams, IItemsByQueryParamsResponse } from '@/contracts/types/backend/items/main.js';
import { ICategoryResponseFromMeliAPI, IPathFromRoot } from '@/contracts/types/meli/category/main.js';
import { AUTHOR } from '@/consts/main.js';
import { mapItemFromMeliApiToItem, mapItemsFromMeliApiToItem } from '@/utils/main.js';
import { CustomError } from '@/errors/customError.js';

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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        return next(new CustomError("Error fetching all items by query param from external Meli API", status, "EXTERNAL_API_ERROR"));
      } else if (error instanceof Error) {
        return next(new CustomError(error.message, 500, "UNEXPECTED_ERROR"));
      } else {
        return next(new CustomError("An unexpected error occurred", 500, "UNKNOWN_ERROR"));
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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        return next(new CustomError("Error fetching item based on id from external Meli API", status, "EXTERNAL_API_ERROR"));
      } else if (error instanceof Error) {
        return next(new CustomError(error.message, 500, "UNEXPECTED_ERROR"));
      } else {
        return next(new CustomError("An unexpected error occurred", 500, "UNKNOWN_ERROR"));
      }
    }

    try {
      const descriptionResponse: AxiosResponse<IItemDescriptionFromMeliResponse> = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
      item.description = descriptionResponse.data.plain_text;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        return next(new CustomError("Error fetching item descriptionbased on id from external Meli API", status, "EXTERNAL_API_ERROR"));
      } else if (error instanceof Error) {
        return next(new CustomError(error.message, 500, "UNEXPECTED_ERROR"));
      } else {
        return next(new CustomError("An unexpected error occurred", 500, "UNKNOWN_ERROR"));
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