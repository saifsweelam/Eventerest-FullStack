import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export default z
    .object({
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),
        PORT: z.coerce.number().default(3000),
    })
    .parse(process.env);
