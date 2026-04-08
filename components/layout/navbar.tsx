"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "About", href: "/about" },
    { name: "Tracks", href: "/tracks" },
    { name: "Speakers", href: "/speakers" },
    { name: "Schedule", href: "/schedule" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
                : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black font-bold">
                        G
                    </div>
                    <div>
                        <p className="text-xs text-white/60">Google Developer Student Club</p>
                        <p className="text-sm font-semibold md:text-base">GDSC ANU</p>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm text-white/75 transition hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    <a href="https://campus.hellorubric.com/?s=9746" target="_blank" rel="noopener noreferrer" 
                    className="group relative inline-flex items-center justify-center rounded-full p-[1.5px]">
                        <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)] opacity-90 transition group-hover:opacity-100" />
                        <span className="relative rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
                            Register Now
                        </span>
                    </a>
                </div>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            <div
                className={`overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-300 md:hidden ${isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl flex-col px-5 py-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}

                    <a
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
                    >
                        Register Now
                    </a>
                </div>
            </div>
        </header>
    );
}