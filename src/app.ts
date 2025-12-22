import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initApp();
  }

  public listen(port: number, callback: () => void) {
    this.app.listen(port, callback);
  }

  private initApp() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );

    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }
}

export { App };
