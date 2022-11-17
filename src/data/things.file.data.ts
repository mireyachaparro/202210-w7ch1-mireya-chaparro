import fs from 'fs/promises';
import * as dotenv from 'dotenv';
import { Known, KnownSinId } from '../interfaces/known.js';
import { Data, id } from './data.js';
import mongoose, { Model, model, Schema } from 'mongoose';
dotenv.config({ path: '../../.env' });

export class KnownFileData implements Data<Known> {
  dataFileURL: string;
  uri: string;
  knownSchema: Schema<KnownSinId>;
  //Thing:
  constructor() {
    this.dataFileURL = process.env.DATA_FILE || '';
    this.uri = `mongodb+srv://${process.env.URI_USER}:${process.env.URI_PASSWORD}@${process.env.URI_CLUSTER}/?retryWrites=true&w=majority`;
    this.knownSchema = new Schema({
      title: String,
    });
    // this.Thing = model('Thing', taskSchema, 'things');
  }

  async getAll(): Promise<Array<Known>> {
    //this.Thing.find();
    return fs
      .readFile(this.dataFileURL, 'utf-8')
      .then((data) => JSON.parse(data).things as Array<Known>);
  }

  async get(id: id): Promise<Known> {
    //this.Thing.findById();
    return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
      const aData = JSON.parse(data).things as Array<Known>;
      const item = aData.find((item) => item.id === id);
      if (!item) throw new Error('Not found id');
      return item;
    });
  }

  async post(newThing: Partial<Known>): Promise<Known> {
    //this.Thing.create();
    const aData = await this.getAll();
    const finalThing = { ...(newThing as Known), id: this.#createID() };
    aData.push(finalThing);
    await this.#saveData(aData);
    return finalThing;
  }

  async patch(id: id, updateThing: Partial<Known>): Promise<Known> {
    //this.Thing.findByIdAndUpdate();
    const aData = await this.getAll();
    const index = aData.findIndex((item) => item.id === id);
    if (!index) throw new Error('Not found id');
    aData[index] = {
      ...aData[index],
      ...updateThing,
    };
    await this.#saveData(aData);
    return aData[index];
  }

  async delete(id: id): Promise<void> {
    //this.Thing.findByIdAndDelete();
    const aData = await this.getAll();
    const index = aData.findIndex((item) => item.id === id);
    if (!index) throw new Error('Not found id');
    await this.#saveData(aData.filter((item) => item.id !== id));
  }

  #createID() {
    return Math.trunc(Math.random() * 1_000_000_000);
  }

  #saveData(data: Array<Known>) {
    return fs.writeFile(this.dataFileURL, JSON.stringify(data));
  }
}
