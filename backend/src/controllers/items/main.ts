import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { IItem, IItemsByQueryParamsResponse } from '@/interfaces/backend/items/main.js';
import { AvailableFilter, AvailableFilterValue, IItemsReponseFromMeliAPI, Result } from '@/interfaces/meli/items/main.js';
import { ICategoryResponseFromMeliAPI, IICategoriesReponseFromMeliAPI, IPathFromRoot } from '@/interfaces/meli/category/main.js';

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
    const response: AxiosResponse<IItemsReponseFromMeliAPI> = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const results: Result[] = response.data.results.slice(0, 4);

    console.log({results});
    
    const items: IItem[] = results.map(({ id, title, currency_id, price, thumbnail, condition, shipping }: Result) => ({
      id,
      title,
      price: {
        currency: currency_id,
        amount: Math.floor(price),
        decimals: Math.round((price % 1) * 100),
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      description: ''
    }));

    const mostCommonCategory: AvailableFilterValue = response.data.available_filters
      .find((filter: AvailableFilter) => filter.id === 'category')?.values
      .reduce((prev: AvailableFilterValue, current: AvailableFilterValue) => (current.results > prev.results ? current : prev)) as AvailableFilterValue;

    const mostCommonCategoryId = mostCommonCategory.id;

    const categoryResponse: AxiosResponse<IICategoriesReponseFromMeliAPI> = await axios.get(`https://api.mercadolibre.com/categories/${mostCommonCategoryId}`);

    const categories = categoryResponse.data.category.path_from_root.map((category: IPathFromRoot) => category.name) || [];
    
  
    const itemsByQueryParams: IItemsByQueryParamsResponse = {
      author: { name: "Fernando", lastName: "Jojoa" },
      categories,
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
    let itemData;
    try {
      const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
      itemData = itemResponse.data;
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({ error: 'Error fetching item: ' + (error.response.data.message || 'Unknown error') });
      } else {
        return res.status(500).json({ error: 'Error fetching item: An unexpected error occurred' });
      }
    }

    let descriptionData;
    try {
      const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
      descriptionData = descriptionResponse.data;
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({ error: 'Error fetching item description: ' + (error.response.data.message || 'Unknown error') });
      } else {
        return res.status(500).json({ error: 'Error fetching item description: An unexpected error occurred' });
      }
    }


    res.json({
      author: {
        name: 'Fernando',
        lastname: 'Jojoa'
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: itemData.price,
          decimals: Math.round((itemData.price % 1) * 100)
        },
        picture: itemData.pictures[0]?.url,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: descriptionData
      }
    });
  } catch (error) {
    next(error);
  }

};