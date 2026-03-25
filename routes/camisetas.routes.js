import { Router } from 'express';
import * as camisetasController from '../controllers/camisetas.controller.js';

const router = Router();

// GET /api/camisetas
router.get('/', camisetasController.getAll);

// GET /api/camisetas/:id
router.get('/:id', camisetasController.getById);

export default router;