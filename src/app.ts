import express from 'express';
import todoRoutes from './routes/todo.routes';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import { authHandler } from './middlewares/authHandler';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', authHandler, todoRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
