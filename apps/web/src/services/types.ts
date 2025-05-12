export type CollectionOptions = {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type Event = {
    id: string;
    name: string;
    description?: string;
    image?: string;
    startDate: string;
    endDate: string;
    location: string;
};

export type Ticket = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export type Creator = {
    id: string;
    name: string;
};

export type Booking = {
    id: string;
    userId: string;
    eventId: string;
    ticketId: string;
};

export type DefaultEvent = Event & {
    tickets: Ticket[];
    creator: Creator;
};

export type DefaultBooking = Booking & {
    event: Event;
    ticket: Ticket;
};

export type CollectionResponse<T> = {
    items: T[];
    total: number;
};
