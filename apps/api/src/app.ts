import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { embedUserMiddleware, requireAuth } from "./middlewares/auth.middleware";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use(embedUserMiddleware);

export default app;
