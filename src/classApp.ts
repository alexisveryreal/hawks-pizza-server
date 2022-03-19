// import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
// import morgan from 'morgan';
import express from 'express';
import { NODE_ENV, PORT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { set, connect } from 'mongoose';
import { dbConnection } from '@databases';
import errorMiddleware from '@middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // init db
    this.connectToDatabase();
    // init middle
    this.initializeMiddlewares();
    // init routes
    this.initalizeRoutes(routes);
    // inti error handling
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.raw({ type: 'application/vnd.custom-type' }));
    this.app.use(express.text({ type: 'text/html' }));
  }

  private initalizeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
