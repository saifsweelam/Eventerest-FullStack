import { Router } from "express";
import { validateRequest } from "../middlewares/validate.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import BookingsService from "../services/bookings.service";
import { bookingIdParamsSchema, createBookingBodySchema, getBookingsCollectionQuerySchema } from "../schemas/bookings.schemas";
import { collectionQuerySchema } from "../schemas/generic.schemas";

const bookingsService = new BookingsService();

const router = Router();

// Get All Bookings Collection
router.get(
    '/',
    requireAuth({ booking: ["read"] }),
    validateRequest({ query: getBookingsCollectionQuerySchema }),
    async (req, res) => {
        const response = await bookingsService.getBookingsCollection(
            req.query,
        );
        res.status(200).json(response);
    },
);

// Get User Bookings Collection
router.get(
    '/me',
    requireAuth({ booking: ["read:own"] }),
    validateRequest({ query: collectionQuerySchema }),
    async (req, res) => {
        const response = await bookingsService.getUserBookingsCollection(
            req.query,
            req.sessionData!.user.id,
        );
        res.status(200).json(response);
    },
);

// Create a new booking
router.post(
    '/',
    requireAuth({ booking: ["create"] }),
    validateRequest({ body: createBookingBodySchema }),
    async (req, res) => {
        const booking = await bookingsService.createBooking(
            req.body,
            req.sessionData!.user.id,
        );
        res.status(201).json(booking);
    },
);

// Get Booking by ID
router.get(
    '/:bookingId',
    requireAuth(),
    validateRequest({ params: bookingIdParamsSchema }),
    async (req, res) => {
        const booking = await bookingsService.getBooking(req.params.bookingId);

        if (!await bookingsService.bookingActionPermission(booking, req.sessionData!.user.id, 'read')) {
            throw new Error("Forbidden");
        }

        res.status(200).json(booking);
    },
);

// Update Booking by ID
router.patch(
    '/:bookingId',
    requireAuth({ booking: ["update"] }),
    validateRequest({ params: bookingIdParamsSchema, body: createBookingBodySchema }),
    async (req, res) => {
        const booking = await bookingsService.getBooking(req.params.bookingId);

        if (!await bookingsService.bookingActionPermission(booking, req.sessionData!.user.id, 'update')) {
            throw new Error("Forbidden");
        }

        const updatedBooking = await bookingsService.updateBooking(
            req.params.bookingId,
            req.body,
        );
        res.status(200).json(updatedBooking);
    },
);

// Delete Booking by ID
router.delete(
    '/:bookingId',
    requireAuth({ booking: ["delete"] }),
    validateRequest({ params: bookingIdParamsSchema }),
    async (req, res) => {
        const booking = await bookingsService.getBooking(req.params.bookingId);

        if (!await bookingsService.bookingActionPermission(booking, req.sessionData!.user.id, 'delete')) {
            throw new Error("Forbidden");
        }

        await bookingsService.deleteBooking(req.params.bookingId);
        res.status(204).send();
    },
);

export default router;
