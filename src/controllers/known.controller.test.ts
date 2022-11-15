import { NextFunction, Request, Response } from 'express';
import { KnownFileData } from '../file/things.file.data';
import { HTTPError } from '../interfaces/error';

import { KnownController } from './known.controller';

describe('Given KnownController', () => {
  const model = new KnownFileData();
  const knownController = new KnownController(model);
  const req = {};
  const resp = {
    json: jest.fn(),
    end: jest.fn(),
  };

  const next = jest.fn().mockResolvedValue({
    statusCode: 500,
    statusMessage: '',
    message: '',
  });

  test('Then ... getAll', async () => {
    await knownController.getAll(
      req as Request,
      resp as unknown as Response,
      next
    );
    expect(resp.json).toHaveBeenCalled();
    expect(resp.end).toHaveBeenCalled();
  });
});
