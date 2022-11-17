import { NextFunction, Request, Response } from 'express';
import { KnownFileData } from '../data/things.file.data';
import { KnownController } from './known.controller';

describe('Given KnownController', () => {
  const model = new KnownFileData();
  const knownController = new KnownController(model);
  const req = {};
  const resp = {
    json: jest.fn(),
    end: jest.fn(),
  };
  const next = jest.fn();
  test('Then ... getAll', async () => {
    await knownController.getAll(
      req as Request,
      resp as unknown as Response,
      next as NextFunction
    );
    expect(resp.json).toHaveBeenCalled();
  });
});
