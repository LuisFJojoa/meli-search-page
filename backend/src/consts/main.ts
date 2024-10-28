import { IAuthor } from "@/contracts/types/backend/author/main.js";
import { customizedErrors } from "@/contracts/types/backend/errors/main.js";
import { BASE_URL } from "@/core/env/variables.js";

export const AUTHOR: IAuthor = {
  name: "Fernando",
  lastname: "Jojoa"
};

export const CustomizedErrors: customizedErrors = Object.freeze({
  item: {
    all: {
      code: 101,
      message:
        'No se pueden obtener items según el parámetro entregado.'
    },
    details: {
      code: 102,
      message:
        'No se pudo traer el detalle del item relacionado.'
    },
    description: {
      code: 103,
      message:
        'No se pudo traer la descripción del item relacionado.'
    }
  },
  categories: {
    breadcrumb: {
      code: 110,
      message:
        'No se pudo obtener el breadcrumb para la categoría del item relacionado.'
    }
  },
  internal: {
    server: {
      code: 500,
      message:
        'Error en el servidor.'
    }
  }
});

export const ENDPOINTS = {
  baseUrl: BASE_URL,
  items: `${BASE_URL}/sites/MLA/search?q=`,
  itemDetail: `${BASE_URL}/items/`,
  itemDescription: '/description/',
  categories: `${BASE_URL}/categories/`
};