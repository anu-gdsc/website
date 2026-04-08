import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const speakers = [
    {
        name: "Harshil Siyani",
        topic: "Build Multiagent Systems with Google ADK",
        image: "/speakers/harshil.jpeg",
        color: "blue",
      },
      {
        name: "Anupam Phogat",
        topic: "The Human API: Fixing the Gap Between University and Reality",
        image: "/speakers/anu.png",
        color: "green",
      },
      {
        name: "Dave Hall",
        topic: "Not Everything Needs an LLM - AWS Group",
        image: "/speakers/dave.jpeg",
        color: "yellow",

      },
      {
        name: "Paul Wayper",
        topic: "Red Hat Insights Advisor Project & the Open Source Ecosystem",
        image: "/speakers/paul.png",
        color: "red",
      },
];

const colorStyles = {
    blue: "bg-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.6)]",
    green: "bg-green-500/50 shadow-[0_0_25px_rgba(34,197,94,0.6)]",
    yellow: "bg-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.6)]",
    red: "bg-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.6)]",
  };

export default function Speakers() {
    return (
        <section id="speakers" className="border-b border-white/10 bg-black py-20 md:py-28">
            <Container>
                <SectionTitle
                    eyebrow="Speakers"
                    title="Meet the voices shaping the day"
                    description="Learn from industry leaders across AI, Cloud, and Open Source."
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {speakers.map((speaker) => (
                        <div
                            key={speaker.name}
                            className={`rounded-3xl p-[2px] ${colorStyles[speaker.color]}`}
                        >
                            <div className="rounded-3xl bg-black p-5">
                            {/* <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-white/10 to-white/5" /> */}
                            <img src={speaker.image} alt={speaker.name}  className="aspect-[4/5] w-full rounded-2xl object-cover"/>
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold">{speaker.name}</h3>
                                <p className="mt-1 text-sm text-white/65">{speaker.topic}</p>
                                {/* <p className="text-sm text-white/50">{speaker.company}</p> */}
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}