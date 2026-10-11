/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaCode, FaKey, FaPaintBrush } from "react-icons/fa";
import { SiJsonwebtokens, SiSwagger, SiWix } from "react-icons/si";
import type { IconType } from "react-icons";

type FilterId = "all" | "frontend" | "backend" | "database" | "tools" | "design";

const FILTERS: { id: FilterId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools", label: "Tools & Platforms" },
    { id: "design", label: "Design & CMS" },
];

/* Either an <img> source or a react-icons component.
   mono: the source SVG is pure black and would be invisible on the dark
   card, so it is recoloured to white via the skill-icon--mono filter. */
type Skill = {
    name: string;
    category: Exclude<FilterId, "all">;
    icon?: string;
    Icon?: IconType;
    mono?: boolean;
};

/* Skills grouped by category in display order:
   Frontend, Backend, Database, Tools & Platforms, Design & CMS.
   Relative order within each category is preserved. */
const skills: Skill[] = [
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "frontend" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "frontend" },
    { name: "Tailwind CSS", icon: "/images-depositphotos-bgremover.png", category: "frontend" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "frontend" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "frontend" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "frontend" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "frontend" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "backend" },
    { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "backend", mono: true },
    { name: "REST API", Icon: SiSwagger, category: "backend" },
    { name: "JWT Authentication", Icon: SiJsonwebtokens, category: "backend" },
    { name: "NextAuth.js", Icon: FaKey, category: "backend" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "backend" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "database" },
    { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg", category: "database" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "tools" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "tools", mono: true },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", category: "tools" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "design" },
    { name: "Adobe Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg", category: "design" },
    { name: "Adobe Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", category: "design" },
    { name: "Pixco", Icon: FaPaintBrush, category: "design" },
    { name: "Wix Studio", Icon: SiWix, category: "design" },
    { name: "Wix Velo", Icon: FaCode, category: "design" },
];

const TOTAL_SKILLS = skills.length;

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [hasInteracted, setHasInteracted] = useState(false);

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    /* Each skill renders exactly once - no repeated/looped entries. */
    const visibleSkills =
        activeFilter === "all"
            ? skills
            : skills.filter((skill) => skill.category === activeFilter);

    const activeLabel = FILTERS.find((f) => f.id === activeFilter)?.label ?? "All";

    const selectFilter = (id: FilterId) => {
        setHasInteracted(true);
        setActiveFilter(id);
    };

    /* Arrow / Home / End navigation between filter buttons. */
    const onFilterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const lastIndex = FILTERS.length - 1;
        let nextIndex: number | null = null;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = index === lastIndex ? 0 : index + 1;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                nextIndex = index === 0 ? lastIndex : index - 1;
                break;
            case "Home":
                nextIndex = 0;
                break;
            case "End":
                nextIndex = lastIndex;
                break;
            default:
                return;
        }

        event.preventDefault();
        buttonRefs.current[nextIndex]?.focus();
    };

    return (
        <section 
            id="skills" 
            ref={ref}
            className="relative py-16 md:py-24 bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Subtitle Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-medium text-primary tracking-wide uppercase">
                            Arsenal
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        <span className="text-white">My </span>
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h2>

                    {/* Animated Gradient Underline */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 80 } : { width: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />

                    <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed px-4">
                         Technologies and tools I work with to build amazing digital experiences.
                    </p>
                </motion.div>

                {/* Filter Controls */}
                <motion.div
                    className="flex justify-center mb-10 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                >
                    <div
                        className="skills-filter-bar"
                        role="group"
                        aria-label="Filter skills by category"
                    >
                        {FILTERS.map((filter, index) => (
                            <button
                                key={filter.id}
                                type="button"
                                ref={(node) => {
                                    buttonRefs.current[index] = node;
                                }}
                                className="skills-filter-btn"
                                aria-pressed={activeFilter === filter.id}
                                onClick={() => selectFilter(filter.id)}
                                onKeyDown={(event) => onFilterKeyDown(event, index)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <p className="sr-only" aria-live="polite">
                    Showing {visibleSkills.length} of {TOTAL_SKILLS} skills: {activeLabel}
                </p>

                {/* Skills Grid (static, no auto-scroll) */}
                <motion.div
                    key={activeFilter}
                    initial={hasInteracted ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <div className="skills-grid">
                        {visibleSkills.map((skill) => (
                            <div className="slide" key={skill.name}>
                                <div className={skill.mono ? "skill-icon skill-icon--mono" : "skill-icon"}>
                                    {skill.Icon ? (
                                        <skill.Icon
                                            className="skill-glyph"
                                            role="img"
                                            aria-label={skill.name}
                                        />
                                    ) : (
                                        <img 
                                            src={skill.icon} 
                                            alt={skill.name}
                                            className="w-full h-full object-contain mx-auto"
                                        />
                                    )}
                                </div>
                                <p className="skill-name text-white">{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            <style jsx>{`
                .skill-icon {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                }

                .skill-glyph {
                    width: 100%;
                    height: 100%;
                    color: #ffffff;
                }

                .skill-name {
                    font-weight: 600;
                    font-size: 14px;
                    text-align: center;
                    margin: 0;
                }
            `}</style>
        </section>
    );
}