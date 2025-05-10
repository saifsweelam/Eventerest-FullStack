import { z } from "zod";

export const collectionQuerySchema = z.object({
    page: z.coerce.number().min(1).optional().default(1),
    limit: z.coerce.number().min(1).optional().default(10),
    offset: z.coerce.number().min(0).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
export type CollectionQuery = z.output<typeof collectionQuerySchema>;
