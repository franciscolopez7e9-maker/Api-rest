import * as camisetasService from '../services/camisetas.service.js';

export const getAll = (req, res, next) => {
    try {
        const result = camisetasService.getAllCamisetas(req.query);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(result.data);
    } catch (error) {
        next(error);
    }
};

export const getById = (req, res, next) => {
    try {
        const result = camisetasService.getCamisetaById(req.params.id);

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        res.status(200).json(result.data);
    } catch (error) {
        next(error);
    }
};