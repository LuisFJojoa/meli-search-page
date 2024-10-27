import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

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