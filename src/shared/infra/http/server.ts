import express from "express";

import "express-async-errors";
import "reflect-metadata";
import createConnection from "../database";
import { errorHandler } from "./middlewares/errors/ErrorHandler.middleware";
import { routes } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => console.log("server is running!"));