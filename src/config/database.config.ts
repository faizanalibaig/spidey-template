import mongoose from 'mongoose';

class DatabaseConfig {
  public async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  public async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

export { DatabaseConfig };
