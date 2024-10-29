import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { AvailableFilter, AvailableFilterValue, Filter, IItemDescriptionFromMeliResponse, IItemsReponseFromMeliAPI, Result } from '@/contracts/types/meli/items/main.js';
import { IItemDetail, IItemDetailsByIdResponse, IItemFromQueryParams, IItemsByQueryParamsResponse } from '@/contracts/types/backend/items/main.js';
import { ICategoryResponseFromMeliAPI, IPathFromRoot } from '@/contracts/types/meli/category/main.js';
import { AUTHOR, CustomizedErrors, ENDPOINTS } from '@/consts/main.js';
import { mapItemFromMeliApiToItem, mapItemsFromMeliApiToItem } from '@/utils/main.js';
import { CustomError } from '@/errors/customError.js';
import { HTTP_SATUS_CODE } from '@/contracts/enums/main.js';

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  let results: Result[] = [];
  let available_filters: AvailableFilter[] = [];
  let filters: Filter = {} as Filter;
  let mostCommonCategory: AvailableFilterValue = {} as AvailableFilterValue;

  const itemsByQueryParams: IItemsByQueryParamsResponse = {
    author: AUTHOR,
    categories: [],
    items: []
  };

  try {
    const itemsResponse: AxiosResponse<IItemsReponseFromMeliAPI> = await axios.get(
      `${ENDPOINTS.items}${query}`
    );

    results = itemsResponse.data.results.slice(0, 4);

    if (results.length === 0) {
      return res.json({
        data: itemsByQueryParams
      });
    }
    available_filters = itemsResponse.data.available_filters;
    filters = itemsResponse.data.filters[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new CustomError(CustomizedErrors.item.all);
    } else if (error instanceof Error) {
      throw new CustomError(CustomizedErrors.internal.server, HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  const items: IItemFromQueryParams[] = mapItemsFromMeliApiToItem(results);

  itemsByQueryParams.items = items;

  try {


    mostCommonCategory = available_filters.find((filter: AvailableFilter) => filter.id === 'category')?.values
      .reduce((prev: AvailableFilterValue, current: AvailableFilterValue) =>
        (current.results > prev.results ? current : prev)) as AvailableFilterValue;

    const itemsByQueryParams: IItemsByQueryParamsResponse = {
      author: AUTHOR,
      categories: [],
      items
    };
    if (mostCommonCategory) {
      const categoryResponse: AxiosResponse<ICategoryResponseFromMeliAPI> = await axios.get(
        `${ENDPOINTS.categories}${mostCommonCategory.id}`
      );

      const categories = categoryResponse.data.path_from_root.map(
        (category: IPathFromRoot) => category.name
      ) || [];

      itemsByQueryParams.categories = categories.length !== 0 ? categories : [mostCommonCategory.name];


    } else {

      if (Object.keys(filters).length !== 0) {
        itemsByQueryParams.categories = filters.values[0].path_from_root?.reverse().map(
          (category: IPathFromRoot) => category.name
        ) || [];

      } else {
        itemsByQueryParams.categories = [];
      }
    }

    res.json({
      data: itemsByQueryParams
    });
  } catch (error) {
    if (items) {
      console.error({ error: 'Error fetching categories to render breadcrumb: ' + (error || 'Unknown error') });
    } else {
      next(error);
    }
  }


};


export const getItemDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const id = req.params.id;
  try {
    let item: IItemDetail = {} as IItemDetail;
    try {
      const itemResponse: AxiosResponse<Result> = await axios.get(`${ENDPOINTS.itemDetail}${id}`);
      item = mapItemFromMeliApiToItem(itemResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new CustomError(CustomizedErrors.item.details);
      } else if (error instanceof Error) {
        throw new CustomError(CustomizedErrors.internal.server, HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    }

    try {
      const descriptionResponse: AxiosResponse<IItemDescriptionFromMeliResponse> = await axios.get(`${ENDPOINTS.itemDetail}${id}${ENDPOINTS.itemDescription}`);
      item.description = descriptionResponse.data.plain_text;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new CustomError(CustomizedErrors.item.description);
      } else if (error instanceof Error) {
        throw new CustomError(CustomizedErrors.internal.server, HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR);
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