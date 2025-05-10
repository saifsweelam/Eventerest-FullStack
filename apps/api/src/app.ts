import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { embedUserMiddleware } from "./middlewares/auth.middleware";
import eventsRouter from "./routes/events.route";
import bookingsRouter from "./routes/bookings.route";

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

app.use("/api/events", eventsRouter);
app.use("/api/bookings", bookingsRouter);

export default app;
