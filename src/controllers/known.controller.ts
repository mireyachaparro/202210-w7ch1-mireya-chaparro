import { Known } from '../interfaces/known';
import importData from '../data/data.json' assert { type: 'json' };
import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';

let data: Array<Known> = importData.things;

export class KnownController {
  getAll(req: Request, resp: Response) {
    resp.json(data); //el response coge toda la data y se lo da al front ya como string
    resp.end(); //para terminar
  }
  get(req: Request, resp: Response) {
    //
  }

  //crear
  async post(req: Request, resp: Response) {
    const newThing = {
      ...req.body,
      id: data.length,
    };
    data.push(newThing);
    resp.json(newThing);
    resp.end();
  }

  //editar
  patch(req: Request, resp: Response) {
    const updateThing = {
      ...data.find((item) => item.id === +req.params.id),
      ...req.body,
    };
    data[data.findIndex((item) => item.id === +req.params.id)] = updateThing;
    resp.json(updateThing);
    resp.end();
  }

  //delete
  delete(req: Request, resp: Response, next: NextFunction) {
    if (!data.find((item) => item.id === +req.params.id)) {
      next(new Error('Not found'));
      return;
    }
    data = data.filter((item) => item.id !== +req.params.id);
    resp.json({});
    resp.end();
  }
}
