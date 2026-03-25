import * as comandasService from '../services/comandas.service.js';

export const create = (req, res, next) => {
    try {
        const result = comandasService.createComanda(req.body);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json(result.data);
    } catch (error) {
        next(error); // Pasa el error al middleware global de errores
    }
};

export const getAll = (req, res, next) => {
    try {
        const result = comandasService.getAllComandas();
        res.status(200).json(result.data);
    } catch (error) {
        next(error);
    }
};

export const getById = (req, res, next) => {
    try {
        const result = comandasService.getComandaById(req.params.id);

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        res.status(200).json(result.data);
    } catch (error) {
        next(error);
    }
};