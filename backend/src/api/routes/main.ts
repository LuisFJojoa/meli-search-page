import express from 'express';
import axios from 'axios';
import { getAllItems, getItemDetails } from '@/controllers/items/main.js';


const router = express.Router();

router.get('/items', getAllItems);

router.get('/items/:id', getItemDetails);

router.get('/categories/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const itemResponse = await axios.get(`https://api.mercadolibre.com/categories/${id}`);

    res.json({
      category: itemResponse.data
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get('/items-meli/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);

    const itemData = itemResponse.data;

    res.json({
      item: itemData
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;