import express from 'express';
import { getAllItems, getItemDetails } from '@/controllers/items/main.js';


const router = express.Router();

router.get('/items', getAllItems);

router.get('/items/:id', getItemDetails);

export default router;