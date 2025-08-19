import express from "express";
import helmet from "helmet";
import linkRoutes from "./routes/link.js"

const app = express();

export class Shorty {
  constructor() {}

  run() {
    app.use(express.json()); 
    app.use(helmet());
    app.use('/', linkRoutes)
    app.listen(process.env.PORT, () => {
      console.info(`Listening on port: ${process.env.PORT}`);
    });

  }
}
