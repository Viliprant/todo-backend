import express from 'express';
import todoRoutes from './routes/todo.routes';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import { authHandler } from './middlewares/authHandler';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes / IP
});

app.use(limiter);
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', authHandler, todoRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
