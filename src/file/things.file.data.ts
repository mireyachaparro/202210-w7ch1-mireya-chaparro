import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Known } from '../interfaces/known.js';
import { Data, id } from './data.js';

export class KnownFileData implements Data<Known> {
  dataFileURL: string;
  constructor() {
    this.dataFileURL = process.env.DATA_FILE || '';
  }

  async getAll(): Promise<Array<Known>> {
    return fs
      .readFile(this.dataFileURL, 'utf-8')
      .then((data) => JSON.parse(data) as Array<Known>);
  }

  async get(id: id): Promise<Known> {
    return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
      const aData = JSON.parse(data) as Array<Known>;
      const item = aData.find((item) => item.id === id);
      if (!item) throw new Error();
      return item;
    });
  }

  async post(newThing: Partial<Known>): Promise<Known> {
    const aData = await this.getAll();
    const finalThing = { ...(newThing as Known), id: this.#createID() };
    aData.push(finalThing);
    await this.#saveData(aData);
    return finalThing;
  }

  async patch(id: id, updateThing: Partial<Known>): Promise<Known> {
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
    const aData = await this.getAll();
    const index = aData.findIndex((item) => item.id === id);
    if (!index) throw new Error('Not found id');
    aData.filter((item) => item.id !== id);
    await this.#saveData(aData);
  }

  #createID() {
    return Math.trunc(Math.random() * 1_000_000_000);
  }

  #saveData(data: Array<Known>) {
    return fs.writeFile(this.dataFileURL, JSON.stringify(data));
  }
}
