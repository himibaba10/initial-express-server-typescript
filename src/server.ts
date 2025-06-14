import http, { Server } from "http";
import config from "./app/config";
import { Application } from "express";

const startServer = async (app: Application) => {
  const server: Server = http.createServer(app);

  server.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`);
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });

  // While normally closing the server, it will stop other services and then shut down gracefully
  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed gracefully.");
      process.exit(0);
    });
  });
};

export default startServer;
