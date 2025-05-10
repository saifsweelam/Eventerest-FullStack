import { Booking } from "../generated/prisma";
import { isPermitted } from "../lib/auth";
import { prisma } from "../lib/db";
import { CreateBookingBody, GetBookingsCollectionQuery, UpdateBookingBody } from "../schemas/bookings.schemas";
import { CollectionQuery } from "../schemas/generic.schemas";
import { getCollectionArgs } from "../utils/collections.util";

export default class BookingsService {
    private readonly defaultInclude = {
        event: true,
        user: true,
        ticket: true,
    }

    async getBookingsCollection(query: GetBookingsCollectionQuery) {
        const args = {
            ...getCollectionArgs(query, "booking"),
            include: this.defaultInclude,
            where: {
                eventId: query.eventId,
                ticketId: query.ticketId,
                userId: query.userId,
            }
        };

        const results = await prisma.$transaction([
            prisma.booking.count({ where: args.where }),
            prisma.booking.findMany(args),
        ]);

        return {
            total: results[0],
            bookings: results[1],
        };
    }

    async getUserBookingsCollection(query: CollectionQuery, userId: string) {
        return this.getBookingsCollection({
            ...query,
            userId,
        })
    }

    async getBooking(id: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: this.defaultInclude,
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    }

    async createBooking(data: CreateBookingBody, userId: string) {
        return await prisma.$transaction(async (context) => {
            const upcomingEvent = await context.event.findFirst({
                where: {
                    id: data.eventId,
                    startDate: {
                        gte: new Date(),
                    },
                },
            });
            if (!upcomingEvent) {
                throw new Error("Event not found or already started");
            }

            const ticket = await context.ticket.findUnique({
                where: { id: data.ticketId },
            });
            if (!ticket || ticket.quantity <= 0) {
                throw new Error("Ticket not available");
            }

            await context.ticket.update({
                where: { id: data.ticketId },
                data: {
                    quantity: ticket.quantity - 1,
                },
            });

            return context.booking.create({
                data: {
                    eventId: data.eventId,
                    ticketId: data.ticketId,
                    userId,
                },
                include: this.defaultInclude,
            });
        });
    }

    async updateBooking(id: string, data: UpdateBookingBody) {
        return await prisma.$transaction(async (context) => {
            const booking = await context.booking.findUnique({
                where: { id },
                include: { ticket: true },
            });
            if (!booking) {
                throw new Error("Booking not found");
            }

            const ticket = await context.ticket.findUnique({
                where: { id: data.ticketId },
            });
            if (!ticket || ticket.quantity <= 0) {
                throw new Error("Ticket not available");
            }

            await context.ticket.update({
                where: { id: booking.ticketId },
                data: {
                    quantity: booking.ticket.quantity + 1,
                },
            });

            await context.ticket.update({
                where: { id: data.ticketId },
                data: {
                    quantity: ticket.quantity - 1,
                },
            });

            return context.booking.update({
                where: { id },
                data: {
                    ticketId: data.ticketId,
                },
                include: this.defaultInclude,
            });
        });
    }

    async deleteBooking(id: string) {
        return await prisma.$transaction(async (context) => {
            const booking = await context.booking.findUnique({
                where: { id },
                include: { ticket: true },
            });

            if (!booking) {
                throw new Error("Booking not found");
            }

            await context.ticket.update({
                where: { id: booking.ticketId },
                data: {
                    quantity: booking.ticket.quantity + 1,
                },
            });

            return context.booking.delete({
                where: { id },
                include: this.defaultInclude,
            });
        });
    }

    async bookingActionPermission(booking: Booking, userId: string, action: 'read' | 'update' | 'delete') {
        const anonymousAccess = await isPermitted(userId, { booking: [action] });
        if (anonymousAccess) {
            return true;
        }
        const ownerAccess = booking.userId === userId && await isPermitted(userId, { booking: [`${action}:own`] });
        if (ownerAccess) {
            return true;
        }
        return false;
    }
}
