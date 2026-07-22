import Container from "@/components/ui/container";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black">
            <Container>
                <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.svg" alt="GDG ANU" className="h-9 w-9" />
                        <div>
                            <p className="text-base font-semibold">GDG ANU</p>
                            <p className="mt-1 text-sm text-white/60">
                                Building, learning, and connecting student developers at ANU.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 text-sm text-white/70">
                        <a href="https://www.instagram.com/gdg_anu/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Instagram
                        </a>
                        <a href="https://gdg.community.dev/gdg-on-campus-the-australian-national-university-canberra-australia/" 
                            target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            LinkedIn
                        </a>
                        <a href="https://www.instagram.com/gdg_anu/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}