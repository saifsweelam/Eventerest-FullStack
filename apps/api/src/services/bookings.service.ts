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
        const booking = await prisma.booking.create({
            data: {
                eventId: data.eventId,
                ticketId: data.ticketId,
                userId,
            },
            include: this.defaultInclude,
        });

        return booking;
    }

    async updateBooking(id: string, data: UpdateBookingBody) {
        const booking = await prisma.booking.update({
            where: { id },
            data: {
                ticketId: data.ticketId,
            },
            include: this.defaultInclude,
        });

        return booking;
    }

    async deleteBooking(id: string) {
        const booking = await prisma.booking.delete({
            where: { id },
            include: this.defaultInclude,
        });

        return booking;
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
