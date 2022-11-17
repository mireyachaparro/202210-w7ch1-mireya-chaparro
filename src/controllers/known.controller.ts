import { NextFunction, Request, Response } from 'express';
import { Data } from '../file/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Known } from '../interfaces/known.js';

export class KnownController {
  constructor(public dataModel: Data<Known>) {}
  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.dataModel.getAll();
      resp.json(data);
    } catch (error) {
      const httpError = new HTTPError(
        503,
        'Service unavailable',
        (error as Error).message
      );
      next(httpError);
      return;
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.dataModel.get(+req.params.id);
      resp.json(data);
    } catch (error) {
      next(this.#createHttpError(error as Error));
      return;
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    if (!req.body.title) {
      const httpError = new HTTPError(
        406,
        'Not Acceptable',
        'Title not included in the data'
      );
      next(httpError);
      return;
    }
    try {
      const newThing = await this.dataModel.post(req.body);
      resp.json(newThing).end();
    } catch (error) {
      const httpError = new HTTPError(
        503,
        'Service unavailable',
        (error as Error).message
      );
      next(httpError);
      return;
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      const updateThing = await this.dataModel.patch(+req.params.id, req.body);
      resp.json(updateThing).end();
    } catch (error) {
      next(this.#createHttpError(error as Error));
      return;
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      await this.dataModel.delete(+req.params.id);
      resp.json({}).end();
    } catch (error) {
      next(this.#createHttpError(error as Error));
      return;
    }
  }

  #createHttpError(error: Error) {
    if ((error as Error).message === 'Not found id') {
      const httpError = new HTTPError(
        404,
        'Not Found',
        (error as Error).message
      );
      return httpError;
    }
    const httpError = new HTTPError(
      503,
      'Service unavailable',
      (error as Error).message
    );
    return httpError;
  }
}
