import { IItemDetail, IItemFromQueryParams } from "@/contracts/types/backend/items/main.js";
import { Result } from "@/contracts/types/meli/items/main.js";
export const mapItemFromMeliApiToItem = (result: Result): IItemDetail => {

  const { id, title, price, currency_id, condition, shipping, thumbnail } = result;
  return {
    id: id,
    title: title,
    price: {
      currency: currency_id,
      amount: price,
      decimals: Math.round((price % 1) * 100)
    },
    picture: thumbnail,
    condition: condition,
    free_shipping: shipping.free_shipping,
    sold_quantity: 0,
    description: ''
  };
};

export const mapItemsFromMeliApiToItem = (results: Result[]): IItemFromQueryParams[] => {

  return results.map(
    ({ id, title, currency_id, price, thumbnail, condition, shipping }: Result) => ({
      id,
      title,
      price: {
        currency: currency_id,
        amount: Math.floor(price),
        decimals: Math.round((price % 1) * 100),
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping
    })
  );
};