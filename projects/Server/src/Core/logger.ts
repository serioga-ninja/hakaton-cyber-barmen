export class Logger {
  info(...args) {
    console.log(...args);
  }

  error(...args) {
    console.error(...args);
  }
}

const logger = new Logger();
export default logger;
