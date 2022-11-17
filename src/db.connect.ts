import mongoose from 'mongoose';
import { DB_USER, DB_CLUSTER, DB_PASSWD } from './config.js';

export function dbConnect() {
  const DBName =
    process.env.NODE_ENV !== 'test' ? 'Coders2022' : 'CodersTesting';
  let uri = `mongodb+srv://${DB_USER}:${DB_PASSWD}`;
  uri += `@${DB_CLUSTER}/${DBName}?retryWrites=true&w=majority`;
  console.log('Connecting to ', DBName);
  return mongoose.connect(uri);
}
