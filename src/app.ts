import dotenv from "dotenv";
dotenv.config(); //it always needs to be on top
import express from "express";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import handleSyncAsyncError from "./app/middlewares/handleSyncAsyncError";
import initiateMiddlewares from "./app/middlewares";
import initiateRoutes from "./app/routes";
import startServer from "./server";

const app = express();
handleSyncAsyncError();

// Middlewares
initiateMiddlewares(app);

// Routes
initiateRoutes(app);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Not found handler
app.use("*", notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

startServer(app).catch((err) => {
  console.log("Failed to start server");
  console.error(err);
  process.exit(1);
});
