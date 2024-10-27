import express from 'express';
import axios from 'axios';


const router = express.Router();

router.get('/items', async (req, res) => {
  
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const results = response.data.results.slice(0, 4); // Solo devolver los primeros 4 productos

    const items = results.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: Math.round((item.price % 1) * 100) // Obtener los decimales
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }));

    const categories = response.data.filters.find(filter => filter.id === 'category')?.values[0]?.path_from_root.map(category => category.name) || [];

    res.json({
      author: {
        name: 'Tu Nombre',
        lastname: 'Tu Apellido'
      },
      categories: categories,
      items: items
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Mercado Libre API' });
  }
});
router.get('/items/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);

    const itemData = itemResponse.data;

    const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    const descriptionData = descriptionResponse.data;

    res.json({
      author: {
        name: 'Tu Nombre',
        lastname: 'Tu Apellido'
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
    res.status(500).json({ error: error });
  }
});

export default router;