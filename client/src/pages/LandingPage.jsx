// =============================================
//  LandingPage.jsx — Full-Page Section Layout
// =============================================
//
//  Spec-aligned:
//    • Hero: text-6xl md:text-8xl font-extrabold gradient
//    • Sections: py-32 md:py-40 generous spacing
//    • ScrollReveal wrappers on all sections
//    • Deep Glass feature cards (rounded-3xl)
//    • Glowing primary CTA buttons
// =============================================

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import MagneticGlow from "../components/MagneticGlow";

// ── Stagger Container ─────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

// ── Child Item ────────────────────────────────
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const buttonSpring = { type: "spring", stiffness: 400, damping: 17 };

// ── Tech stack marquee ────────────────────────
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

// ── Stats ─────────────────────────────────────
const STATS = [
    { value: "50+", label: "Mock Interviews Done" },
    { value: "3", label: "Languages Supported" },
    { value: "~200ms", label: "Code Sync Speed" },
];

const LandingPage = () => {
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
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] backdrop-blur-md rounded-full px-5 py-2 text-[13px] text-white/80 mb-10">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                College Project · Interview Platform
                            </span>
                        </motion.div>

                        {/* Hero Heading — text-6xl md:text-8xl font-extrabold gradient */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-heading font-extrabold text-6xl md:text-8xl tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-5xl"
                        >
                            Interviews that you
                            <br />
                            need Indeed
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-lg md:text-xl text-white/40 font-light max-w-lg mt-8 leading-relaxed"
                        >
                            A real-time collaborative interview platform built with
                            React, Node.js, WebRTC, and Monaco Editor.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center gap-5 mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="btn-glow-primary text-[15px] px-9 py-3.5"
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
       *  py-32 md:py-40 generous spacing
       * ═══════════════════════════════════════════ */}
            <section className="relative py-48 md:py-60">
                {/* Glassy background panel */}
                <div className="absolute inset-x-4 md:inset-x-8 inset-0 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md pointer-events-none" />

                <div className="page-container relative z-10">

                    {/* ── Section Heading ── */}
                    <ScrollReveal className="text-center">
                        <span className="section-badge mb-5 inline-block">Features</span>
                        <h2 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mt-3">
                            Everything You Need
                        </h2>
                        <p className="text-white/35 text-lg md:text-xl font-light mt-4 mx-auto leading-relaxed text-center">
                            Core features built for seamless technical interviews.
                        </p>
                    </ScrollReveal>

                    {/* ── Feature cards — Deep Glass ── */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-10 md:gap-12 mt-20 md:mt-28"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        {FEATURES.map((feature) => (
                            <MagneticGlow key={feature.title}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -6,
                                        borderColor: "rgba(255,255,255,0.25)",
                                        boxShadow: "0 0 25px 0 rgba(99,102,241,0.4), 0 0 60px -8px rgba(139,92,246,0.3), 0 0 100px -15px rgba(168,85,247,0.2), inset 0 1px 1px 0 rgba(255,255,255,0.15)",
                                    }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="
                      rounded-3xl border border-white/[0.10]
                      bg-white/[0.05] backdrop-blur-2xl
                      p-10 md:p-12
                      min-h-[260px] md:min-h-[300px]
                      flex flex-col items-center justify-center text-center
                      group cursor-default
                      hover:bg-white/[0.08]
                      transition-all duration-400
                      shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]
                    "
                                >
                                    <div className="relative z-10 w-14 h-14 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-2xl mb-10 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="relative z-10 font-heading text-lg md:text-xl font-semibold text-white mb-6 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="relative z-10 text-white/40 text-[14px] leading-[1.8]">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </MagneticGlow>
                        ))}
                    </motion.div>

                    {/* ── Stats — Big gap above ── */}
                    <ScrollReveal className="mt-48 md:mt-60">
                        <div className="grid grid-cols-3 gap-8 pt-14 border-t border-white/[0.06]">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl md:text-5xl font-heading font-extralight text-white tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[12px] text-white/25 mt-6 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
       *  PAGE 3 — CTA
       *  py-32 md:py-40 generous spacing
       * ═══════════════════════════════════════════ */}
            <section className="min-h-screen flex items-center justify-center py-32 md:py-40 relative">
                <div className="page-container w-full">
                    <ScrollReveal>
                        <MagneticGlow glowSize={400}>
                            <div
                                className="
              rounded-3xl border border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]
              min-h-[75vh]
              flex flex-col items-center justify-center gap-6
              px-8 md:px-16
              py-16 md:py-20
              text-center
              relative overflow-hidden
            "
                            >
                                {/* Background glow orbs */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                                {/* ── Top: Heading area ── */}
                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <span className="section-badge">Try It Out</span>
                                    </div>

                                    <h2 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-4xl">
                                        Ready to Experience
                                        <br />
                                        the Platform?
                                    </h2>
                                </div>

                                {/* ── Middle: Description ── */}
                                <p className="text-white/35 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed relative z-10">
                                    Create a room, share the link, and start interviewing.
                                    It's that simple. No sign-up required for candidates.
                                </p>

                                {/* ── Bottom: Buttons ── */}
                                <div className="relative z-10 flex flex-col items-center mt-8">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={buttonSpring}
                                            className="btn-glow-primary text-[15px] px-9 py-3.5"
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
                                    </div>
                                </div>
                            </div>
                        </MagneticGlow>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
       *  FOOTER
       * ═══════════════════════════════════════════ */}
            <footer className="relative border-t border-white/[0.06]">
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md pointer-events-none" />
                <div className="page-container relative z-10 py-14">
                    <div className="grid md:grid-cols-4 gap-12 md:gap-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="text-white/80 text-lg">⊞</span>
                                <span className="font-heading text-[15px] font-medium text-white tracking-tight">InterviewPlatform</span>
                            </div>
                            <p className="text-white/30 text-[13px] leading-relaxed max-w-[240px]">
                                A full-stack interview platform built as a college project using React, Node.js, and WebRTC.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">Platform</h4>
                            <ul className="space-y-3">
                                {["Dashboard", "Create Room", "Join Room", "How It Works"].map((item) => (
                                    <li key={item}><a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">Tech Stack</h4>
                            <ul className="space-y-3">
                                {["React + Vite", "Node.js + Express", "WebRTC", "Monaco Editor"].map((item) => (
                                    <li key={item}><a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-5">Connect</h4>
                            <ul className="space-y-3">
                                {["GitHub Repo", "LinkedIn", "Portfolio", "Email"].map((item) => (
                                    <li key={item}><a href="#" className="text-white/30 text-[13px] hover:text-white/60 transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/20 text-[12px]">Built with ♥ as a college project · 2026</p>
                        <div className="flex items-center gap-6">
                            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                                <a key={social} href="#" className="text-white/20 text-[12px] hover:text-white/50 transition-colors duration-300">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
