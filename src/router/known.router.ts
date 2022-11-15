import { Router } from 'express';
import { KnownController } from '../controllers/known.controller.js';
import { KnownFileData } from '../file/things.file.data.js';

export const knownRouter = Router();

const controller = new KnownController(new KnownFileData());

knownRouter.get('/', controller.getAll.bind(controller));
knownRouter.get('/:id', controller.get.bind(controller));
knownRouter.post('/', controller.post.bind(controller));
knownRouter.patch('/:id', controller.patch.bind(controller));
knownRouter.delete('/:id', controller.delete.bind(controller));
