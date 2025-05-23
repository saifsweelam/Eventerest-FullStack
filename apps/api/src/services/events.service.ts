import { prisma } from "../lib/db";
import {
    CreateEventBody,
    GetEventsCollectionQuery,
    UpdateEventBody,
} from "../schemas/events.schemas";
import { getCollectionArgs } from "../utils/collections.util";

export default class EventsService {
    private readonly defaultInclude = {
        creator: true,
        tickets: true,
    };

    async getEventsCollection(query: GetEventsCollectionQuery) {
        const args = {
            ...getCollectionArgs(query, "event"),
            include: this.defaultInclude,
            where: undefined,
        };

        const results = await prisma.$transaction([
            prisma.event.count({ where: args.where }),
            prisma.event.findMany(args),
        ]);

        return {
            total: results[0],
            items: results[1],
        };
    }

    async getEvent(id: string) {
        const event = await prisma.event.findUnique({
            where: { id },
            include: this.defaultInclude,
        });
        if (!event) {
            throw new Error("Event not found");
        }
        return event;
    }

    async createEvent(data: CreateEventBody, creatorId: string) {
        const event = await prisma.event.create({
            data: {
                name: data.name,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                location: data.location,
                tickets: {
                    create: data.tickets,
                },
                creatorId,
            },
            include: this.defaultInclude,
        });

        return event;
    }

    async updateEvent(id: string, data: UpdateEventBody) {
        const event = await prisma.event.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                location: data.location,
                tickets: data.tickets
                    ? {
                          deleteMany: {},
                          create: data.tickets,
                      }
                    : undefined,
            },
            include: this.defaultInclude,
        });

        return event;
    }

    async deleteEvent(id: string) {
        const event = await prisma.event.delete({
            where: { id },
            include: this.defaultInclude,
        });

        return event;
    }
}
