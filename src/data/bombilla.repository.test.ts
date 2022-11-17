import mongoose from 'mongoose';
import { dbConnect } from '../db.connect';
import { BombillaRepository } from './bombilla.repository';

const mockData = [
  {
    name: 'philips',
    power: 100,
    isLed: true,
  },
  {
    name: 'lampara de noche',
    power: 50,
    isLed: false,
  },
];

describe('Given BombillaRepository', () => {
  const repository = new BombillaRepository();
  let testIds: Array<string>;
  beforeAll(async () => {
    await dbConnect();
    await repository.getModel().deleteMany();
    await repository.getModel().insertMany(mockData);
    const data = await repository.getModel().find();
    testIds = [data[0].id, data[1].id];
  });

  test('Then getAll should return the name of the first register', async () => {
    const result = await repository.getAll();
    expect(result[0].name).toEqual(mockData[0].name);
  });

  test('Then post should return the new object', async () => {
    const newBombilla = {
      name: 'arabica',
    };
    const result = await repository.post(newBombilla);
    expect(result.name).toEqual(newBombilla.name);
  });

  test('Then patch should return the object with the updated property', async () => {
    const updatedBombilla = {
      name: 'samsung',
    };
    const result = await repository.patch(testIds[0], updatedBombilla);
    expect(result.name).toEqual(updatedBombilla.name);
  });

  test('Then delete should return an empty object', async () => {
    const result = await repository.delete(testIds[0]);
    expect(result).toBeUndefined();
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
