class Logger {
  private static instance: Logger;
  private constructor() {
    // sentry??
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(...message) {
    console.log(`[Logger - log]:`, message);
  }

  error(...message) {
    console.error(`[Logger - Error]:`, message);
  }
}

export default Logger;
