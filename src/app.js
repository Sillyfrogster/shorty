import express from "express";
import linkRoutes from "./routes/link.js"
import { ShortyLogger } from "./logger/index.js";

const app = express();

export class Shorty {
  constructor() {
    this.logger = new ShortyLogger(process.env);
  }

  run() {
    app.use(express.json()); 
    app.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
      next();
    });
    app.use('/', linkRoutes)
    app.listen(3000, () => {
      this.logger.log(`Listening on port: 3000`);
    });

  }
}
