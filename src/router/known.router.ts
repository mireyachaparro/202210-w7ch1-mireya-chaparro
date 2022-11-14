import { Router } from 'express';
import { KnownController } from '../controllers/known.controller.js';

export const knownRouter = Router();

const controller = new KnownController();

knownRouter.get('/', controller.getAll);
knownRouter.get('/:id', controller.get);
knownRouter.post('/', controller.post);
knownRouter.patch('/:id', controller.patch);
knownRouter.delete('/:id', controller.delete);
