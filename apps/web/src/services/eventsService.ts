import { apiClient } from "../lib/apiClient";
import type { CollectionResponse, DefaultEvent, CollectionOptions } from "./types";

export const getEvents = async ({ page = 1, limit = 10, sortBy, sortOrder = "asc" }: CollectionOptions) => {
    const { data } = await apiClient.get<CollectionResponse<DefaultEvent>>("/api/events", {
        params: {
            page,
            limit,
            sortBy,
            sortOrder,
        },
    });
    return data;
};

export const getEvent = async (id: string) => {
    const { data } = await apiClient.get<DefaultEvent>(`/api/events/${id}`);
    return data;
};
