import mongoose, { Schema, model } from 'mongoose';
import { Bombilla, ProtoBombilla } from '../interfaces/bombilla.js';
import { Data, id } from './data.js';

export class BombillaRepository implements Data<Bombilla> {
  #schema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    power: Number,
    isLed: Boolean,
  });
  #Model = model('Bombilla', this.#schema, 'bombillas');

  constructor() {
    this.#schema.set('toJSON', {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
      },
    });
  }

  async getAll(): Promise<Array<Bombilla>> {
    return this.#Model.find();
  }
  async get(id: id): Promise<Bombilla> {
    const result = await this.#Model.findById(id);
    if (!result) throw new Error('Not found id');
    return result as unknown as Bombilla;
  }

  async post(data: ProtoBombilla): Promise<Bombilla> {
    const result = await this.#Model.create(data);
    return result as unknown as Bombilla;
  }
  async patch(id: id, data: Partial<Bombilla>): Promise<Bombilla> {
    const result = await this.#Model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!result) throw new Error('Not found id');
    return result as unknown as Bombilla;
  }

  async delete(id: id): Promise<void> {
    const result = await this.#Model.findByIdAndDelete(id);
    if (result === null) throw new Error('Not found id');
    return;
  }

  #disconnect() {
    mongoose.disconnect();
    console.log(mongoose.connection.readyState);
  }

  getModel() {
    return this.#Model;
  }
}
