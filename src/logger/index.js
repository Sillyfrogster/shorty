import chalk from "chalk";
import { Console } from "node:console";
import { createWriteStream } from "node:fs";

export class ShortyLogger {
  constructor(options = {}) {
    this.logger =
      options.logToFile === false
        ? new Console(createWriteStream(`./${options.fileName}.log`))
        : new Console(process.stdout, process.stderr);
  }

  log(data) {
    this.logger.log(data);
  }
}
