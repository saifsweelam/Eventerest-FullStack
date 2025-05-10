import { Router } from "express";
import { validateRequest } from "../middlewares/validate.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import {
    createEventBodySchema,
    eventIdParamsSchema,
    getEventsCollectionQuerySchema,
    updateEventBodySchema,
} from "../schemas/events.schemas";
import EventsService from "../services/events.service";

const router = Router();
const eventsService = new EventsService();

// Get Events Collection
router.get(
    "/",
    validateRequest({ query: getEventsCollectionQuerySchema }),
    async (req, res) => {
        const response = await eventsService.getEventsCollection(req.query);
        res.status(200).json(response);
    },
);

// Create a new event
router.post(
    "/",
    requireAuth({ event: ["create"] }),
    validateRequest({ body: createEventBodySchema }),
    async (req, res) => {
        const event = await eventsService.createEvent(
            req.body,
            req.sessionData!.user.id,
        );
        res.status(201).json(event);
    },
);

// Get an event by ID
router.get(
    "/:eventId",
    validateRequest({ params: eventIdParamsSchema }),
    async (req, res) => {
        const event = await eventsService.getEvent(req.params.eventId);
        res.status(200).json(event);
    },
);

// Update an event by ID
router.patch(
    "/:eventId",
    requireAuth({ event: ["update"] }),
    validateRequest({ params: eventIdParamsSchema, body: updateEventBodySchema }),
    async (req, res) => {
        const event = await eventsService.updateEvent(
            req.params.eventId,
            req.body,
        );
        res.status(200).json(event);
    },
);

// Delete an event by ID
router.delete(
    "/:eventId",
    requireAuth({ event: ["delete"] }),
    validateRequest({ params: eventIdParamsSchema }),
    async (req, res) => {
        const event = await eventsService.deleteEvent(req.params.eventId);
        res.status(204).json(event);
    },
);

export default router;
