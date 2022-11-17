import { NextFunction, Request, Response } from 'express';
import { BombillaRepository } from '../data/bombilla.repository.js';
import { BombillaController } from './bombilla.js';

jest.mock('../data/bombilla.repository');

describe('Given BombillaController', () => {
  BombillaRepository.prototype.getAll = jest
    .fn()
    .mockResolvedValue(['philips']);
  const repository = new BombillaRepository();

  const bombillaController = new BombillaController(repository);
  const req: Partial<Request> = {};
  const resp: Partial<Response> = {
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  test('Then getAll should have a register with name Philips', async () => {
    await bombillaController.getAll(req as Request, resp as Response, next);
    expect(resp.json).toHaveBeenCalledWith({ bombillas: ['philips'] });
  });
});
