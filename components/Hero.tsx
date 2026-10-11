/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, useReducedMotion, Variants } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { FaReact, FaNodeJs, } from "react-icons/fa";
import { SiJavascript, SiNextdotjs,SiMongodb, SiTypescript } from "react-icons/si";

/* Heading titles that rotate every 3 seconds. */
const HERO_TITLES = ["MERN-Stack", "Frontend"] as const;
const HERO_TITLE_INTERVAL = 2000;


export default function Hero() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    /* Alternate the heading title every 3 seconds. */
    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
        }, HERO_TITLE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
    };



const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };
    

const floatingIcons = [
    { Icon: FaReact, color: "text-blue-400", delay: 0 },
    { Icon: FaNodeJs, color: "text-green-500", delay: 0.2 },
    { Icon: SiJavascript, color: "text-yellow-400", delay: 0.4 },
    { Icon: SiMongodb, color: "text-green-500", delay: 0.6 }, 
    { Icon: SiNextdotjs, color: "text-white dark:text-white text-black", delay: 0.8 }, // Next.js
    { Icon: SiTypescript, color: "text-blue-600", delay: 1.0 }, // TypeScript
];

    return (
        <section
            id="home"
            ref={ref}
            className="relative min-h-screen pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-16 overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Simple Background - Removed all animations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Only keep a very subtle static gradient */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern - Static, no animation */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Floating Particles - Removed */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        }}
                        animate={{
                            y: [null, -30, 30, -30],
                            x: [null, 30, -30, 30],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div> */}
            

            <div className="container mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16"
                >
                    {/* Text Content */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 text-center lg:text-left order-2 lg:order-1"
                        style={{
                            transform: isHovering ? `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg)` : 'none',
                            transition: 'transform 0.1s ease-out',
                        }}
                    >
                        {/* Badge */}
                        <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 self-center lg:self-start px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-xs font-medium text-primary">Available for work</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <h2 className="text-3xl md:text-4xl font-semibold text-white">
                                Hello<span className="text-primary">.</span>
                                <span className="ml-3 text-primary">
                                    <TypeAnimation
                                        sequence={[
                                            'Developer',
                                            2000,
                                            'Designer',
                                            2000,
                                            'Coder',
                                            2000,
                                            'Problem Solver',
                                            2000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                        className="inline-block"
                                    />
                                </span>
                            </h2>
                            <motion.div 
                                className="absolute -bottom-2 h-0.5 w-16 bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: 64 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            />
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300">
                            I&apos;m <span className="text-primary font-semibold">Shoyaib Islam</span>
                        </motion.p>

                        <motion.h1 
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                        >
                            
                            <span className="inline-grid align-baseline">
                                {HERO_TITLES.map((title, index) => (
                                    <motion.span
                                        key={title}
                                        className="col-start-1 row-start-1"
                                        initial={false}
                                        animate={{
                                            opacity: index === titleIndex ? 1 : 0,
                                            y: index === titleIndex ? 0 : prefersReducedMotion ? 0 : 10,
                                        }}
                                        transition={{
                                            duration: prefersReducedMotion ? 0 : 0.5,
                                            ease: "easeOut",
                                        }}
                                        aria-hidden={index === titleIndex ? undefined : "true"}
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                                Developer
                            </span>
                        </motion.h1>

                        <motion.p 
                            variants={itemVariants}
                            className="text-base md:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            I build modern full-stack web applications using MongoDB, Express.js, React.js, Next.js, and Node.js — creating clean, scalable solutions with seamless UI/UX and high-performance APIs.
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 justify-center lg:justify-start"
                        >
                            {/* View Projects Button */}
<motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full sm:w-auto"
>
    <Link
        href="#projects"
        className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 text-white font-medium py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-center inline-flex items-center justify-center gap-2 overflow-hidden"
    >
        <span className="relative z-10">View Projects</span>
        <motion.span
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            →
        </motion.span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
</motion.div>

{/* Resume Button */}
<motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full sm:w-auto"
>
    <Link
        href="https://drive.google.com/file/d/1Hrp3oxCejdK1omgQOnE9mVF4eqXJA-BD/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full sm:w-auto border border-primary/50 text-primary font-medium py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
    >
        <i className="fas fa-download"></i>
        Resume
    </Link>
</motion.div>
                        </motion.div>

{/* Social Links */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex gap-4 justify-center lg:justify-start mt-6"
                        >
                            {[
                                { name: 'github', url: 'https://github.com/shoybit' },
                                { name: 'linkedin', url: 'https://linkedin.com/in/shoyaib-islam1' }
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <i className={`fab fa-${social.name}`}></i>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Profile Image */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full lg:w-1/3 flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
                    >
                        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px]">
                            {/* Glowing Rings - Removed animation */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary opacity-10 blur-2xl"></div>
                            <div className="absolute inset-[-10%] rounded-full border border-primary/5"></div>
                            <div className="absolute inset-[-20%] rounded-full border border-primary/5"></div>

                            {/* Main Image Container */}
                            <motion.div 
                                className="relative rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    transform: isHovering ? `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)` : 'none',
                                    transition: 'transform 0.1s ease-out',
                                }}
                            >
                                <div className="relative w-full aspect-square">
                                    <img
                                        alt="Portrait of Shoyaib Islam, a front-end developer."
                                        className="object-cover object-top w-full h-full"
                                        src="/Hero Image.png"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                        </span>
                                        <span className="text-xs text-gray-300">Active now</span>
                                    </div>
                                </div>
                            </motion.div>
                        {/* Floating Tech Icons */}
                        {floatingIcons.map((item, index) => (
                            <motion.div
                                key={index}
                                className="absolute bg-gray-800/90 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-700"
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    x: [0, (index % 2 === 0 ? 20 : -20)],
                                    y: [0, (index % 2 === 0 ? -20 : 20)],
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: item.delay, 
                                }}
                                style={{
                                    top: `${20 + index * 15}%`,
                                    right: index % 2 === 0 ? '-10%' : 'auto',
                                    left: index % 2 === 1 ? '-10%' : 'auto',
                                }}
                                whileHover={{ scale: 1.2, rotate: 360 }}
                            >
                               
                                <item.Icon className={`${item.color} text-xl`} />
                            </motion.div>
                        ))}
                            {/* Experience Badge */}
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-purple-600 p-4 rounded-xl shadow-xl"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">1+</div>
                                    <div className="text-xs text-white/80">Years Experience</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className=" hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                        Scroll
                    </span>
                    <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center relative">
                        <motion.div
                            className="absolute w-1 h-2 bg-primary rounded-full"
                            animate={{
                                y: [4, 16, 4],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}