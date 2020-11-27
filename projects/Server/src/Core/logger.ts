export class Logger {
  info(...args) {
    console.log(...args);
  }

  debug(...args) {
    console.debug(...args);
  }

  error(...args) {
    console.error(...args);
  }
}

const logger = new Logger();
export default logger;
