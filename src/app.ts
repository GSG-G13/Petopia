import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { join } from 'path';
import router from './routes';
import { sequelize } from './db';

dotenv.config();
const { NODE_ENV, PORT } = process.env;
const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

app.use('/api/v1', router);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database sync complete');
    if (NODE_ENV === 'production') {
      app.use(express.static(join(__dirname, '..', 'client', 'build')));
      app.get('/*', (_req, res) => {
        res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
      });
    }
    app.listen(PORT ?? 3000, () => {
      console.log(`App live on: http://localhost:${PORT ?? 3000}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

export default app;
