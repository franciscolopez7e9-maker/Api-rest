import { Router } from 'express';
import * as comandasController from '../controllers/comandas.controller.js';

const router = Router();

// POST /api/comandas
router.post('/', comandasController.create);

// GET /api/comandas
router.get('/', comandasController.getAll);

// GET /api/comandas/:id
router.get('/:id', comandasController.getById);

export default router;