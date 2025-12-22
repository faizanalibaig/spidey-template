import { App } from './app';
import { config, DatabaseConfig, logger } from './config';

const database = new DatabaseConfig();

async function bootstrap() {
  const app = new App();
  const port = config.app.port;

  await database.connect();
  logger.info('Database connected');

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

bootstrap();
