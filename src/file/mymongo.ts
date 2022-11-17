import mongoose, { model, Schema } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
//conexion
const uri = `mongodb+srv://${process.env.URI_USER}:${process.env.URI_PASSWORD}@${process.env.URI_CLUSTER}/?retryWrites=true&w=majority
`;

const connector = async () => {
  return await mongoose.connect(uri);
};

console.log(connector());
console.log(mongoose.connection.readyState);
//esquema
const thingsSchema = new Schema({
  title: String, //los tipos en mongoose van en mayusculas. tambien se puede poner "mongoose.SchemaTypes." para ver los tipos que hay
  id: Number,
});
//modelo
const Thing = model('Thing', thingsSchema, 'things'); //(nombre del modelo, esquema, nombre de la coleccion (opcional)) //Thing es mi modelo
//crear registro
Thing.create({ title: 'probando', id: 231 }); //factory
// new Thing({ title: 'probando', id: 231 }); //constructor
