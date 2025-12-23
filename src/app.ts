import express from 'express';
import todoRoutes from './routes/todo.routes';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/todos', todoRoutes);

app.use(errorHandler);

export default app;
