import "express-async-errors";
import express, { Application } from "express";
import "reflect-metadata";
import { handleErrors } from "./error";
import moviesRouter from "./routes/movies.router";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(handleErrors);

export default app;
