import express from "express";

const app = express();

export class Shorty {
  super() {}

  run() {
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`);
    });
  }
}
