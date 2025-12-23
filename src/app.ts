import express from 'express';
import todoRoutes from './routes/todo.routes';

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
