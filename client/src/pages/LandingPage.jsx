// =============================================
//  LandingPage.jsx — Full-Page Section Layout
// =============================================
//
//  Each major section occupies its own viewport:
//    Page 1: Hero (scroll-fade)
//    Page 2: Features "Everything You Need"
//    Page 3: CTA "Ready to Transform Hiring?"
//    Footer: Minimal glassmorphic footer
//
// =============================================

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Stagger Container ─────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

// ── Child Item (fade-in + slide-up) ───────────
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ── Button spring physics ─────────────────────
const buttonSpring = {
    type: "spring",
    stiffness: 400,
    damping: 17,
};

// ── Marquee logos ─────────────────────────────
const MARQUEE_LOGOS = [
    "React", "Node.js", "WebRTC", "Monaco", "Socket.IO",
    "Express", "MongoDB", "Tailwind", "Framer Motion", "Vite",
];

// ── Feature data ──────────────────────────────
const FEATURES = [
    {
        icon: "⚡",
        title: "Real-Time Code Editor",
        description:
            "Collaborative Monaco editor with live cursors, syntax highlighting, and multi-language support. Code together seamlessly in real-time.",
    },
    {
        icon: "🎥",
        title: "Video & Audio Chat",
        description:
            "Built-in WebRTC video calls so you can see and hear your candidate without switching apps. Low-latency peer-to-peer connection.",
    },
    {
        icon: "🧠",
        title: "AI-Powered Feedback",
        description:
            "Instant code analysis and structured evaluation reports generated after every interview session. Get actionable insights.",
    },
];

// ── Realistic stats for a college project ─────
const STATS = [
    { value: "50+", label: "Mock Interviews Done" },
    { value: "3", label: "Languages Supported" },
    { value: "~200ms", label: "Code Sync Speed" },
];

const LandingPage = () => {
    // ── Scroll-fade for hero section ──────────
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);
    const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);

    return (
        <>
            {/* ═══════════════════════════════════════════
       *  PAGE 1 — HERO
       * ═══════════════════════════════════════════ */}
            <section ref={heroRef} className="min-h-screen relative overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] backdrop-blur-md rounded-full px-5 py-2 text-[13px] text-white/80 mb-10">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                College Project · Interview Platform
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-heading font-extralight text-6xl md:text-[110px] tracking-tighter leading-[0.9] text-white max-w-6xl"
                        >
                            Interviews that you
                            <br />
                            need Indeed
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-[15px] md:text-[17px] text-white/40 max-w-lg mt-8 leading-relaxed"
                        >
                            A real-time collaborative interview platform built with
                            React, Node.js, WebRTC, and Monaco Editor.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center gap-5 mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="btn-glass btn-glow-sweep text-[15px] px-9 py-3.5"
                            >
                                <span className="relative z-10">Get Started Now</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="btn-glass-ghost btn-radial text-[15px] px-9 py-3.5"
                            >
                                <span className="relative z-10">View on GitHub</span>
                            </motion.button>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-24 flex items-center gap-8 text-white/25"
                        >
                            <span className="text-[13px] tracking-wide">Scroll down</span>
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
                            >
                                <div className="w-1 h-1.5 rounded-full bg-white/40" />
                            </motion.div>
                            <span className="text-[13px] tracking-wide">to explore</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
       *  PAGE 2 — FEATURES
       *  Spacious layout filling the full viewport
       * ═══════════════════════════════════════════ */}
            <motion.section
                className="min-h-screen flex flex-col justify-center py-20 relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                {/* Glassy background panel */}
                <div className="absolute inset-x-4 md:inset-x-8 inset-y-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md pointer-events-none" />

                <div className="page-container relative z-10 flex flex-col h-full">

                    {/* Tech stack marquee */}
                    <div className="mb-12 overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] py-5">
                        <div className="flex animate-marquee">
                            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
                                <span
                                    key={`${logo}-${i}`}
                                    className="text-white/10 text-lg md:text-xl font-heading font-light tracking-tight whitespace-nowrap mx-10"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Section header */}
                    <motion.div variants={itemVariants} className="text-center mb-14 md:mb-20">
                        <span className="section-badge mb-5 inline-block">Features</span>
                        <h2 className="font-heading text-4xl md:text-6xl font-extralight tracking-tighter text-white mt-3">
                            Everything You Need
                        </h2>
                        <p className="text-white/35 text-[15px] mt-5 max-w-md mx-auto leading-relaxed">
                            Core features built for seamless technical interviews.
                        </p>
                    </motion.div>

                    {/* Feature cards */}
                    <div className="grid md:grid-cols-3 gap-5 md:gap-7 mb-16 md:mb-24">
                        {FEATURES.map((feature) => (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.18)" }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.03]
                  backdrop-blur-lg
                  p-8 md:p-10
                  group cursor-default
                  hover:bg-white/[0.06]
                  transition-all duration-400
                  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                "
                            >
                                <div
                                    className="
                    w-14 h-14 rounded-xl
                    bg-white/[0.06] border border-white/[0.1]
                    flex items-center justify-center
                    text-2xl mb-7
                    group-hover:bg-white/[0.1]
                    group-hover:border-white/[0.15]
                    transition-all duration-300
                  "
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-white/40 text-[14px] leading-[1.8]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats row — realistic project numbers */}
                    <motion.div
                        variants={itemVariants}
                        className="
              grid grid-cols-3 gap-8
              pt-10
              border-t border-white/[0.06]
            "
                    >
                        {STATS.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-heading font-extralight text-white tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-[12px] text-white/25 mt-3 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
       *  PAGE 3 — CTA
       *  Spacious, fills the viewport
       * ═══════════════════════════════════════════ */}
            <motion.section
                className="min-h-screen flex items-center justify-center py-20 relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                <div className="page-container w-full">
                    <motion.div
                        variants={itemVariants}
                        className="
              rounded-3xl
              border border-white/[0.08]
              bg-white/[0.03]
              backdrop-blur-xl
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]
              min-h-[70vh]
              flex flex-col items-center justify-center
              px-8 md:px-16
              text-center
              relative overflow-hidden
            "
                    >
                        {/* Background glow orbs */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none"
                            aria-hidden="true"
                        />
                        <div
                            className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none"
                            aria-hidden="true"
                        />

                        {/* Badge */}
                        <motion.div variants={itemVariants} className="mb-10">
                            <span className="section-badge">Try It Out</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            variants={itemVariants}
                            className="font-heading text-4xl md:text-7xl font-extralight tracking-tighter text-white mb-8 relative z-10 max-w-4xl"
                        >
                            Ready to Experience
                            <br />
                            the Platform?
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-white/35 text-[15px] md:text-[16px] max-w-md mx-auto mb-14 leading-relaxed relative z-10"
                        >
                            Create a room, share the link, and start interviewing.
                            It's that simple. No sign-up required for candidates.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10 mb-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="btn-glass btn-shimmer text-[15px] px-9 py-3.5"
                            >
                                <span className="relative z-10">Create a Room</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="btn-glass-ghost btn-radial text-[15px] px-9 py-3.5"
                            >
                                <span className="relative z-10">View Demo</span>
                            </motion.button>
                        </motion.div>

                        {/* Small feature highlights */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center justify-center gap-6 text-white/20 text-[12px] tracking-wider uppercase relative z-10"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-green-400/60" />
                                No Sign-Up Needed
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-blue-400/60" />
                                WebRTC Video
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-purple-400/60" />
                                Live Code Sync
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
       *  FOOTER
       * ═══════════════════════════════════════════ */}
            <footer className="relative border-t border-white/[0.06]">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md pointer-events-none" />

                <div className="page-container relative z-10 py-14">
                    <div className="grid md:grid-cols-4 gap-12 md:gap-8">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="text-white/80 text-lg">⊞</span>
                                <span className="font-heading text-[15px] font-medium text-white tracking-tight">
                                    InterviewPlatform
                                </span>
                            </div>
                            <p className="text-white/30 text-[13px] leading-relaxed max-w-[240px]">
                                A full-stack interview platform built as a college project using React, Node.js, and WebRTC.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">
                                Platform
                            </h4>
                            <ul className="space-y-3">
                                {["Dashboard", "Create Room", "Join Room", "How It Works"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">
                                Tech Stack
                            </h4>
                            <ul className="space-y-3">
                                {["React + Vite", "Node.js + Express", "WebRTC", "Monaco Editor"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">
                                Connect
                            </h4>
                            <ul className="space-y-3">
                                {["GitHub Repo", "LinkedIn", "Portfolio", "Email"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/20 text-[12px]">
                            Built with ♥ as a college project · 2026
                        </p>
                        <div className="flex items-center gap-6">
                            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                                <a key={social} href="#" className="text-white/20 text-[12px] hover:text-white/50 transition-colors duration-300">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
