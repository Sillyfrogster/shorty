import express from "express";
import linkRoutes from "./routes/link.js"
const app = express();

export class Shorty {
  constructor() {}

  run() {
    app.use(express.json()); 
    app.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
      next();
    });
    app.use('/', linkRoutes)
    app.listen(3000, () => {
      console.log(`Listening on port: 3000`);
    });

  }
}
