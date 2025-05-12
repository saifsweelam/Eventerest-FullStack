import { useQuery } from "@tanstack/react-query";
import Spotlight from "../spotlight";
import { getEvents } from "../../services/eventsService";
import EventCard from "../event-card";
import { Link } from "react-router";

export default function LandingEvents() {
    const { data: events, isLoading, isError } = useQuery({
        queryKey: ["landingEvents"],
        queryFn: () => getEvents({ page: 1, limit: 3 }),
    })

    if (isLoading || isError) {
        return <></>;
    }

    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                        <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
                            <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                                Upcoming Events
                            </span>
                        </div>
                        <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                            Book your ticket now!
                        </h2>
                        <p className="text-lg text-indigo-200/65">
                            Now you can book your ticket for the upcoming events
                            and get the latest updates on your favorite events.
                        </p>
                    </div>
                    {/* Spotlight items */}
                    <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
                        {events?.items.map(event => (<EventCard event={event} key={event.id} />))}
                    </Spotlight>
                    <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center pt-4">
                        <div data-aos="fade-up" data-aos-delay={600}>
                            <Link
                                className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                                to="/events"
                            >
                                More Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
