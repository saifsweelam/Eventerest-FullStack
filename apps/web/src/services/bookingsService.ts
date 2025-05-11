import { apiClient } from "../lib/apiClient";
import type { CollectionOptions, CollectionResponse, DefaultBooking } from "./types";

export const getUserBookings = async ({ page = 1, limit = 10, sortBy, sortOrder = 'asc' }: CollectionOptions) => {
    const { data } = await apiClient.get<CollectionResponse<DefaultBooking>>(`/api/bookings/my`, {
        params: {
            page,
            limit,
            sortBy,
            sortOrder,
        },
    });
    return data;
};

export const getBooking = async (id: string) => {
    const { data } = await apiClient.get<DefaultBooking>(`/api/bookings/${id}`);
    return data;
};

export const createBooking = async (eventId: string, ticketId: string) => {
    const { data } = await apiClient.post<DefaultBooking>(`/api/bookings`, {
        eventId,
        ticketId,
    });
    return data;
};

export const updateBooking = async (id: string, ticketId: string) => {
    const { data } = await apiClient.put<DefaultBooking>(`/api/bookings/${id}`, {
        ticketId,
    });
    return data;
};

export const deleteBooking = async (id: string) => {
    const { data } = await apiClient.delete<DefaultBooking>(`/api/bookings/${id}`);
    return data;
};
