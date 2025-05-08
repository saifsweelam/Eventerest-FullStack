import express from "express";
import cors from "cors";
import { toNodeHandler } from 'better-auth/node';
import { auth } from "./lib/auth";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use('/api/auth/*splat', toNodeHandler(auth));

export default app;
