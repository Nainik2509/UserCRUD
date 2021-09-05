const http = require("http");
const app = require("./config/express");
const { env, port } = require("./config/env-vars");
const { Connect } = require("./config/mongoose");
const logger = require("./config/logger");
const chalk = require('chalk');

const server = http.createServer(app);

process.on("uncaughtException", err => {
  logger.info(chalk.redBright(`UNCAUGHT EXCEPTION! 💥 Shutting down...`));
  logger.info(chalk.redBright(`${err.name}, ${err.message}`));
  // process.exit(1);
});
server.listen(port);

server.on("listening", () => {
  Connect();
  logger.info(`We're flying on ${chalk.greenBright(`${env.toUpperCase()}_${port}`)}`);
});

process.on("unhandledRejection", err => {
  console.log(err)
  logger.info("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.info(chalk.redBright(`${err.name}`));
  logger.info(chalk.redBright(`${err.message}`));
  // server.close(() => {
  //   process.exit(1);
  // });
});

process.on("SIGTERM", () => {
  logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  // server.close(() => {
  //   logger.info("💥 Process terminated!");
  // });
});

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};
server.on("error", onError);

module.exports = server;
