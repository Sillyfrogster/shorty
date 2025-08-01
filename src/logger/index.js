import chalk from "chalk";
import { Console } from "node:console";
import { createWriteStream } from "node:fs";

class ShortyLogger {
  constructor(options = {}) {
    this.options = options;
    this.logger = options.logToFile
      ? new Console(createWriteStream(`./${options.logging.name}`))
      : new Console(process.stdout, process.stderr);
  }
}
