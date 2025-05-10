import { z } from "zod";
import { collectionQuerySchema } from "./generic.schemas";

export const bookingIdParamsSchema = z.object({
    bookingId: z.string().cuid("Invalid booking ID"),
});

export const getBookingsCollectionQuerySchema = z
    .object({
        eventId: z.string().optional(),
        ticketId: z.string().optional(),
        userId: z.string().optional(),
    })
    .and(collectionQuerySchema);
export type GetBookingsCollectionQuery = z.output<
    typeof getBookingsCollectionQuerySchema
>;

export const createBookingBodySchema = z.object({
    eventId: z.string().cuid("Invalid event ID"),
    ticketId: z.string().cuid("Invalid ticket ID"),
});
export type CreateBookingBody = z.output<typeof createBookingBodySchema>;

export const updateBookingBodySchema = z.object({
    ticketId: z.string().cuid("Invalid ticket ID"),
});
export type UpdateBookingBody = z.output<typeof updateBookingBodySchema>;
