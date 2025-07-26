import express from "express";
import linkRoutes from "./routes/link.mjs"

const app = express();

export class Shorty {
  super() {

  }

  run() {
    app.use('/link', linkRoutes)
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`);
    });

  }
}
