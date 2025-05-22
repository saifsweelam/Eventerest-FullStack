import { useState } from "react";
import useMasonry from "../../utils/useMasonry";
import TestimonialImg01 from "../../assets/images/testimonial-01.jpg";
import TestimonialImg02 from "../../assets/images/testimonial-02.jpg";
import TestimonialImg03 from "../../assets/images/testimonial-03.jpg";
import TestimonialImg04 from "../../assets/images/testimonial-04.jpg";
import TestimonialImg05 from "../../assets/images/testimonial-05.jpg";
import TestimonialImg06 from "../../assets/images/testimonial-06.jpg";
import TestimonialImg07 from "../../assets/images/testimonial-07.jpg";
import TestimonialImg08 from "../../assets/images/testimonial-08.jpg";
import TestimonialImg09 from "../../assets/images/testimonial-09.jpg";
import ClientImg01 from "../../assets/images/client-logo-01.svg";
import ClientImg02 from "../../assets/images/client-logo-02.svg";
import ClientImg03 from "../../assets/images/client-logo-03.svg";
import ClientImg04 from "../../assets/images/client-logo-04.svg";
import ClientImg05 from "../../assets/images/client-logo-05.svg";
import ClientImg06 from "../../assets/images/client-logo-06.svg";
import ClientImg07 from "../../assets/images/client-logo-07.svg";
import ClientImg08 from "../../assets/images/client-logo-08.svg";
import ClientImg09 from "../../assets/images/client-logo-09.svg";
import TestimonialCard from "../testimonial-card";
import TestimonialCategory from "../testimonial-category";
import { BriefcaseBusiness, Layers, LocateFixed, PersonStanding, TextCursorInput } from "lucide-react";

const categories = [
    {
        id: 1,
        label: "View All",
        Icon: Layers,
    },
    {
        id: 2,
        label: "Organizers",
        Icon: TextCursorInput,
    },
    {
        id: 3,
        label: "Locations",
        Icon: LocateFixed,
    },
    {
        id: 4,
        label: "Attendees",
        Icon: PersonStanding,
    },
    {
        id: 5,
        label: "Enterprises",
        Icon: BriefcaseBusiness,
    },
];

const testimonials = [
    {
        img: TestimonialImg01,
        clientImg: ClientImg01,
        name: "MaKayla P.",
        company: "Frequent Festival Goer",
        content:
            "I’ve booked four events through this site—every time it was fast, easy, and reliable. The jazz night I attended last month? Absolutely unforgettable!",
        categories: [1, 3, 5],
    },
    {
        img: TestimonialImg02,
        clientImg: ClientImg02,
        name: "Andrew K.",
        company: "Startup Enthusiast",
        content:
            "The networking events are perfectly curated. I’ve met collaborators, mentors, and even landed a client—all thanks to this platform.",
        categories: [1, 2, 4],
    },
    {
        img: TestimonialImg03,
        clientImg: ClientImg03,
        name: "Lucy D.",
        company: "Local Artist",
        content:
            "I used to miss out on local art workshops, but now I get alerts and can book instantly. This site makes supporting the creative community so easy!",
        categories: [1, 2, 5],
    },
    {
        img: TestimonialImg04,
        clientImg: ClientImg04,
        name: "Pavel M.",
        company: "Weekend Explorer",
        content:
            "Every weekend I find something new—concerts, outdoor movies, cultural festivals. It’s like having a personal event planner in my pocket.",
        categories: [1, 4],
    },
    {
        img: TestimonialImg05,
        clientImg: ClientImg05,
        name: "Miriam E.",
        company: "Event Organizer",
        content:
            "Listing my events here has been a game changer. Tickets sell out faster and I reach a much wider audience. So glad I joined.",
        categories: [1, 3, 5],
    },
    {
        img: TestimonialImg06,
        clientImg: ClientImg06,
        name: "Eloise V.",
        company: "Workshop Attendee",
        content:
            "The photography workshop I joined was incredible. The site made it so simple to register, and the reviews helped me choose wisely.",
        categories: [1, 3],
    },
    {
        img: TestimonialImg07,
        clientImg: ClientImg07,
        name: "Pierre-Gilles L.",
        company: "Tourist from Paris",
        content:
            "I booked all my Cairo experiences before I even landed—historic tours, live music, food tastings. Everything went smoothly!",
        categories: [1, 2, 5],
    },
    {
        img: TestimonialImg08,
        clientImg: ClientImg08,
        name: "Danielle K.",
        company: "Busy Mom of 3",
        content:
            "This site makes it so easy to find family-friendly events. I booked a kids' puppet show in minutes, and the boys loved it!",
        categories: [1, 4],
    },
    {
        img: TestimonialImg09,
        clientImg: ClientImg09,
        name: "Mary P.",
        company: "New in Town",
        content:
            "Just moved to the city and this platform helped me find everything from language exchanges to salsa nights. It’s my social lifeline now!",
        categories: [1, 2],
    },
];

export default function Testimonials() {
    const masonryContainer = useMasonry();
    const [category, setCategory] = useState<number>(1);

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
                {/* Section header */}
                <div className="mx-auto max-w-3xl pb-12 text-center">
                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                        Don't take our word for it
                    </h2>
                    <p className="text-lg text-indigo-200/65">
                        We provide tech-first solutions that empower
                        decision-makers to build healthier and happier
                        workspaces from anywhere in the world.
                    </p>
                </div>

                <div>
                    {/* Buttons */}
                    <div className="flex justify-center pb-12 max-md:hidden md:pb-16">
                        <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1">
                            {categories.map((categoryItem) => (
                                <TestimonialCategory
                                    key={categoryItem.id}
                                    id={categoryItem.id}
                                    Icon={categoryItem.Icon}
                                    label={categoryItem.label}
                                    category={category}
                                    setCategory={setCategory}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Cards */}
                    <div
                        className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
                        ref={masonryContainer}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="group">
                                <TestimonialCard
                                    testimonial={testimonial}
                                    category={category}
                                >
                                    {testimonial.content}
                                </TestimonialCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
