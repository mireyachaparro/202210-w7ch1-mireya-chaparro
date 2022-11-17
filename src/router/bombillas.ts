import { Router } from 'express';
import { BombillaController } from '../controllers/bombilla.js';
import { BombillaRepository } from '../data/bombilla.repository.js';

export const bombillaRouter = Router();

const controller = new BombillaController(new BombillaRepository());

bombillaRouter.get('/', controller.getAll.bind(controller));
bombillaRouter.get('/:id', controller.get.bind(controller));
bombillaRouter.post('/', controller.post.bind(controller));
bombillaRouter.patch('/:id', controller.patch.bind(controller));
bombillaRouter.delete('/:id', controller.delete.bind(controller));
