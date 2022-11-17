//esto es una prueba que funciona, para que inserte datos en la base de datos
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose, { model, Schema } from 'mongoose';
dotenv.config({ path: '../../.env' });

const uri = `mongodb+srv://${process.env.URI_USER}:${process.env.URI_PASSWORD}@${process.env.URI_CLUSTER}/?retryWrites=true&w=majority`;

const taskSchema = new Schema({
  title: String,
  responsible: String,
  isClompleted: Boolean,
});

const Task = model('Task', taskSchema, 'tasks');

(async () => {
  const conector = await mongoose.connect(uri);

  await Task.create({
    title: 'prueba',
    responsible: 'pepe',
    isClompleted: true,
  });

  conector.disconnect();
})();
