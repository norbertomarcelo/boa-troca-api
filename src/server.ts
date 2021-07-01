import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();
const port = 3333;

app.use(router);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
