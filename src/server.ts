import 'module-alias/register';

import { App } from '@root/app';
import { config, DatabaseConfig, logger } from '@root/config';

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
