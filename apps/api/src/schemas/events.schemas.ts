import { z } from "zod";
import { collectionQuerySchema } from "./generic.schemas";

export const eventIdParamsSchema = z.object({
    eventId: z.string().cuid("Invalid event ID"),
});

export const getEventsCollectionQuerySchema = z
    .object({})
    .and(collectionQuerySchema);
export type GetEventsCollectionQuery = z.output<
    typeof getEventsCollectionQuerySchema
>;

export const createEventBodySchema = z.object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().optional(),
    startDate: z.coerce.date().refine((date) => date > new Date(), {
        message: "Event date must be in the future",
    }),
    endDate: z.coerce.date(),
    location: z.string(),
    tickets: z.array(
        z.object({
            name: z.string().min(1, "Ticket name is required"),
            price: z.number().positive("Ticket price must be positive"),
            quantity: z
                .number()
                .int()
                .positive("Ticket quantity must be positive"),
        }),
    ),
});
export type CreateEventBody = z.output<typeof createEventBodySchema>;
