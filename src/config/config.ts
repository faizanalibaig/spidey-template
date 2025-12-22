import * as z from 'zod';
import dotenv from 'dotenv';

import { logger } from '.';

dotenv.config({ quiet: true });

interface AppConfig {
  app: {
    port: number;
  };
  database: {
    uri: string;
  };
}

const AppConfigSchema = z.object({
  PORT: z.number().min(1).max(65535).default(3000),
  MONGO_URI: z.string().default('mongodb://localhost:27017'),
});

const appConfig = AppConfigSchema.safeParse({
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
});

if (!appConfig.success) {
  logger.error(`Invalid configuration: ${appConfig.error}`);
  process.exit(1);
}

const config: AppConfig = {
  app: {
    port: appConfig.data.PORT,
  },
  database: {
    uri: appConfig.data.MONGO_URI,
  },
};

export { config };
