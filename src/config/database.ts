import mongoose from 'mongoose';

import { config, logger } from '.';

class DatabaseConfig {
  public async connect() {
    try {
      await mongoose.connect(config.database.uri);
    } catch (error) {
      logger.error(`Error connecting to MongoDB: ${error}`);
    }
  }

  public async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(`Error disconnecting from MongoDB: ${error}`);
    }
  }
}

export { DatabaseConfig };
