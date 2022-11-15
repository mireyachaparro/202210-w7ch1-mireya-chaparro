import { KnownController } from './known.controller';
import { Request, Response } from 'express';

describe('Given KnownController', () => {
  const knownController = new KnownController();
  const req = {};
  const resp = {
    json: jest.fn(),
    end: jest.fn(),
  };
  const thingMock = {
    title: 'prueba',
    id: 1,
  };
  describe('when the function is gettAll()', () => {
    test('then it will return all data', () => {
      knownController.getAll(req as Request, resp as unknown as Response);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.end).toHaveBeenCalled();
    });
  });
  describe('when the function is get()', () => {
    test('then it will return data with this id', () => {
      //
    });
  });
  describe('when the function is post()', () => {
    test('then it will add the new thing', () => {
      // data.push(thingMock)
      knownController.post(req as Request, resp as unknown as Response);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.end).toHaveBeenCalled();
    });
  });
  describe('when the function is patch()', () => {
    test('then it will update the thing with this id', () => {
      knownController.getAll(req as Request, resp as unknown as Response);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.end).toHaveBeenCalled();
    });
  });
  describe('when the function is delete()', () => {
    test('then it will delete the thing with this id', () => {
      knownController.getAll(req as Request, resp as unknown as Response);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.end).toHaveBeenCalled();
    });
  });
});
