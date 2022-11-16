import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { knownRouter } from './router/known.router.js';
import { CustomError } from './interfaces/error.js';

export const app = express();

//aqui poner el disable para arreglar la seguridad de sonar para que no todo el mundo sepa quue utilizamos express
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//aqui poner el app.use que ha puesto el para arreglar la seguridad de sonar para el cors, para que no este abierto para todo el mundo (creo)
app.use((req, res, next) => {
  const origin = req.header('Origin');
  res.setHeader('Access-Control-Allow-Origin', origin as string);
  next();
});

app.get('/', (_req, res) => {
  res.send('API Express de cosas que se').end();
});

app.use('/things', knownRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
    console.log(
      error.name,
      error.statusCode,
      error.statusMessage,
      error.message
    );
    let status = error.statusCode || 500;
    if (error.name === 'ValidationError') {
      status = 406;
    }
    const result = {
      status: status,
      type: error.name,
      error: error.message,
    };
    resp.status(status).json(result).end();
  }
);
