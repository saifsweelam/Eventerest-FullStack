import type { LucideIcon } from "lucide-react";

export default function TestimonialCategory({ id, Icon, label, category, setCategory }: {
    id: number,
    Icon: LucideIcon,
    label: string,
    category: number,
    setCategory: (id: number) => void
}) {
    const isActive = category === id;
    return (
        <button
            className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${isActive
                    ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                    : "opacity-65 transition-opacity hover:opacity-90"
                }`}
            aria-pressed={isActive}
            onClick={() => setCategory(id)}
        >
            <Icon width={16} height={16} className={`${isActive ? "text-indigo-500" : "text-gray-600"}`} />
            <span>{label}</span>
        </button>
    );
};
