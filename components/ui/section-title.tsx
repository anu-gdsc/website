type SectionTitleProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    center?: boolean;
};

export default function SectionTitle({
    eyebrow,
    title,
    description,
    center = false,
}: SectionTitleProps) {
    return (
        <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            {eyebrow ? (
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                    {eyebrow}
                </p>
            ) : null}

            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>

            {description ? (
                <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                    {description}
                </p>
            ) : null}
        </div>
    );
}