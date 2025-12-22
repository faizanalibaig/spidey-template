import pino from 'pino';

import { App } from './app';
import { DatabaseConfig } from './config';

const database = new DatabaseConfig();

async function bootstrap() {
  const app = new App();
  const port = Number(process.env.PORT) || 3000;
  const logger = pino();

  await database.connect();
  logger.info('Database connected');

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

bootstrap();
