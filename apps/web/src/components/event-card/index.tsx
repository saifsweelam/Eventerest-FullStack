import { Link } from 'react-router';
import defaultImage from '../../assets/images/workflow-01.png';
import type { DefaultEvent } from "../../services/types";

export default function EventCard({ event }: { event: DefaultEvent }) {

    return (
        <Link
            className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
            to={`/events/${event.id}`}
        >
            <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}
                <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                    aria-hidden="true"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={9}
                        height={8}
                        fill="none"
                    >
                        <path
                            fill="#F4F4F5"
                            d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                        />
                    </svg>
                </div>
                {/* Image */}
                <img
                    className="inline-flex"
                    src={event.image ?? defaultImage}
                    style={{ width: '100%' }}
                    width={350}
                    height={288}
                    alt="Workflow 01"
                />
                {/* Content */}
                <div className="p-6">
                    <div className="mb-3">
                        <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                            <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                                {event.creator.name}
                            </span>
                        </span>
                    </div>
                    <p className="text-indigo-200/65">
                        {event.name}
                    </p>
                </div>
            </div>
        </Link>
    )
};
