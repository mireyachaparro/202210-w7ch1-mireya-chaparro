import { KnownController } from './known.controller';
import { Request, Response } from 'express';

describe('Given KnownController', () => {
  const knownController = new KnownController();
  const req = {};
  const resp = {
    json: jest.fn(),
    end: jest.fn(),
  };
  describe('when the function is gettAll()', () => {
    test('then it will return all data', () => {
      knownController.getAll(req as Request, resp as unknown as Response);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.end).toHaveBeenCalled();
    });
  });
});
