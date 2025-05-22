import { Link } from 'react-router';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import defaultImage from '../../assets/images/workflow-01.png';
import type { DefaultEvent } from "../../services/types";

export default function EventCard({ event }: { event: DefaultEvent }) {
    const startDate = new Date(event.startDate).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const startTime = new Date(event.startDate).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });

    const lowestPrice =
        event.tickets && event.tickets.length > 0
            ? Math.min(...event.tickets.map(t => t.price))
            : null;

    return (
        <Link
            className="group/card relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-400/60 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-400 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-30 group-hover:before:opacity-100"
            to={`/events/${event.id}`}
        >
            <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-900 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/30 after:via-gray-800/10 after:to-gray-900/30">
                {/* Arrow */}
                <div
                    className="absolute z-50 right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-300/40 bg-indigo-500/20 text-white opacity-0 transition-opacity group-hover/card:opacity-100 shadow-lg"
                    aria-hidden="true"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={9}
                        height={8}
                        fill="none"
                    >
                        <path
                            fill="#ffffff"
                            d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                        />
                    </svg>
                </div>

                {/* Image */}
                <img
                    className="inline-flex brightness-110 contrast-110"
                    src={event.image ?? defaultImage}
                    style={{ width: '100%' }}
                    width={350}
                    height={288}
                    alt={event.name}
                />

                {/* Content */}
                <div className="p-6 flex flex-col gap-2">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-indigo-100 group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {event.name}
                    </h3>

                    {/* Host */}
                    <span className="text-xs text-gray-400">
                        Hosted by{' '}
                        <span className="font-medium text-indigo-400">
                            {event.creator.name}
                        </span>
                    </span>

                    {/* Date & Location */}
                    <div className="text-sm text-indigo-200 flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-indigo-300" />
                            <span>{startDate} @ {startTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-indigo-300" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    </div>

                    {/* Ticket Price */}
                    {lowestPrice !== null && (
                        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-green-300">
                            <Ticket className="h-4 w-4 text-green-300" />
                            From ${lowestPrice.toFixed(2)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
