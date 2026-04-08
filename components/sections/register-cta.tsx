import Container from "@/components/ui/container";

export default function RegisterCTA() {
    return (
        <section id="register" className="bg-black py-20 md:py-28">
            <Container>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.18),transparent_25%)]" />

                    <div className="relative max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                            Join the event
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                            Be part of the GDSC ANU experience.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                            Register early, secure your spot, and be part of a day built for
                            ambitious student developers and builders.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://campus.hellorubric.com/?s=9746"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                            >
                                Register Now
                            </a>
                            <a
                                href="#speakers"
                                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                            >
                                Explore Speakers
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}