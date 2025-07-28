import express from "express";
import linkRoutes from "./routes/link.js"

const app = express();

export class Shorty {
  constructor() {}

  run() {
    app.use('/link', linkRoutes)
    app.listen(3000, () => {
      console.log(`Listening on port: 3000`);
    });

  }
}
