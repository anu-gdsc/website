import Container from "@/components/ui/container";

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-white/10 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(234,67,53,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(52,168,83,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,188,5,0.16),transparent_28%)]" />

            <Container>
                <div className="relative grid min-h-[88vh] items-center gap-14 py-20 md:grid-cols-2 md:py-28">
                    <div>
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                            Google Developer Student Club • ANU
                        </p>

                        <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
                            Build, learn, and connect with the next generation of developers.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                            Join GDSC ANU for a flagship community event featuring talks,
                            workshops, networking, and hands-on sessions across AI, cloud, web,
                            and product innovation.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                            <span>Canberra, ACT</span>
                            <span className="h-1 w-1 rounded-full bg-white/40" />
                            <span>ANU Campus</span>
                            <span className="h-1 w-1 rounded-full bg-white/40" />
                            <span>October 2026</span>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href="#register"
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                            >
                                Register Now
                            </a>

                            <a
                                href="#schedule"
                                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                            >
                                View Schedule
                            </a>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="relative h-[360px] w-[360px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#4285F4_0deg,#EA4335_90deg,#FBBC05_180deg,#34A853_270deg,#4285F4_360deg)] p-[1px] shadow-[0_0_120px_rgba(66,133,244,0.18)] md:h-[460px] md:w-[460px]">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-xl">
                                <div className="h-[65%] w-[65%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0.02),transparent_70%)] blur-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}