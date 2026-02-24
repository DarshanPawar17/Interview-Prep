// =============================================
//  LandingPage.jsx — Vibrant Premium Landing Page
// =============================================
//
//  Spec-aligned:
//    • Aurora Grid Background
//    • Sweeping Animated Gradient Text
//    • Bento Box Features Grid
//    • Floating 3D Mockup Cards (Parallax)
//    • Border Beam CTA Button
// =============================================

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import MagneticGlow from "../components/MagneticGlow";

// ── Hover Aurora + Grid Background ─────────────
const AuroraBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen bg-[#030712]">
        {/* Subtle animated dotted grid overlay */}
        <div
            className="absolute inset-0 z-10 opacity-20"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}
        />

        {/* Animated Aurora Orbs */}
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-purple-600/40 blur-[150px]"
        />
        <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[10%] -right-[10%] w-[50%] h-[60%] rounded-full bg-cyan-600/40 blur-[150px]"
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] left-[20%] w-[70%] h-[50%] rounded-full bg-pink-600/30 blur-[150px]"
        />
    </div>
);

// ── Stagger Container ─────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

// ── Floating Mockup Elements ──────────────────
const FloatingMockups = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden lg:block">
            {/* Mockup 1: Code Snippet */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-[10%] w-[260px] h-[160px] rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-5 flex flex-col"
            >
                <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 space-y-2.5">
                    <div className="h-2 w-3/4 bg-purple-400/30 rounded" />
                    <div className="h-2 w-1/2 bg-cyan-400/30 rounded" />
                    <div className="h-2 w-4/5 bg-pink-400/30 rounded" />
                    <div className="h-2 w-1/3 bg-white/20 rounded" />
                </div>
            </motion.div>

            {/* Mockup 2: Video Call Bubble */}
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[25%] right-[10%] w-[220px] rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-4 flex items-center gap-4"
            >
                <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 to-emerald-400">
                    <div className="absolute inset-[2px] rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/micah/svg?seed=Mia" alt="avatar" className="w-full h-full scale-110 translate-y-1" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold relative flex items-center gap-2">
                        Live Call
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </span>
                    <span className="text-white/40 text-xs">Interviewing...</span>
                </div>
            </motion.div>

            {/* Mockup 3: AI Feedback Pill */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] left-[25%] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] px-6 py-3 flex items-center gap-3"
            >
                <span className="text-xl">✨</span>
                <span className="text-white text-sm font-medium tracking-wide">AI Analysis Complete</span>
            </motion.div>
        </div>
    );
};

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
        <div className="bg-[#030712] relative min-h-screen">
            <AuroraBackground />

            {/* ═══════════════════════════════════════════
       *  PAGE 1 — HERO
       * ═══════════════════════════════════════════ */}
            <section ref={heroRef} className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-20">
                <FloatingMockups />

                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="flex flex-col items-center justify-center text-center px-6 relative z-20 w-full"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-center w-full max-w-6xl mx-auto"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2.5 border border-purple-500/30 bg-purple-500/10 backdrop-blur-md rounded-full px-5 py-2 text-[13px] text-purple-200 mb-10 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400/60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                                </span>
                                Next-Gen Interview Platform
                            </span>
                        </motion.div>

                        {/* Animated Gradient Hero Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-heading font-extrabold text-6xl md:text-8xl lg:text-[100px] tracking-tighter leading-[0.95] max-w-5xl animate-gradient-x bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent pb-4 drop-shadow-sm"
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Interviews that you
                            <br />
                            need Indeed
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-lg md:text-xl text-white/50 font-medium max-w-2xl mt-6 leading-relaxed"
                        >
                            A real-time collaborative platform built for modern engineering teams.
                            Experience seamless coding, vivid video calls, and instant AI feedback.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center gap-6 mt-14"
                        >
                            {/* Border Beam CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="relative px-10 py-4 w-full sm:w-auto overflow-hidden rounded-2xl group flex justify-center bg-[#0a0f1a]"
                            >
                                {/* The animated border beam */}
                                <div className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_50%,#00f2fe_100%)] animate-spin-slow" style={{ padding: '2px' }}>
                                    <div className="w-full h-full bg-[#0a0f1a] rounded-2xl" />
                                </div>
                                <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                                <span className="relative z-10 text-[16px] font-bold text-white tracking-wide flex items-center gap-2">
                                    Get Started Free <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="px-10 py-4 w-full sm:w-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-[16px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all shadow-sm"
                            >
                                <span className="relative z-10">View on GitHub</span>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-28 flex items-center gap-8 text-white/30"
                        >
                            <span className="text-[14px] tracking-wide font-medium">Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2 bg-white/5"
                            >
                                <div className="w-1 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
       *  PAGE 2 — FEATURES (BENTO GRID)
       * ═══════════════════════════════════════════ */}
            <section className="relative py-32 md:py-48 z-20 w-full">
                <div className="page-container relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">

                    <ScrollReveal className="text-center mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-[13px] font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                            Features
                        </span>
                        <h2 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                            Everything You Need
                        </h2>
                        <p className="text-white/50 text-xl font-medium mt-6 max-w-2xl mx-auto">
                            A complete toolkit built specifically for seamless, high-performance technical interviews.
                        </p>
                    </ScrollReveal>

                    {/* Side-by-Side Features with Stats Underneath */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">

                        {/* Column 1: Code Editor & Stat */}
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="w-full group relative rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 overflow-hidden hover:border-cyan-500/30 transition-colors duration-500 flex flex-col items-center text-center flex-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(0,242,254,0.4)] mb-8">
                                    ⚡
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white mb-4">Real-Time Code Editor</h3>
                                <p className="text-white/50 text-base leading-relaxed">
                                    Collaborative Monaco editor with live cursors, syntax highlighting, and multi-language support. Code together seamlessly.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="w-full rounded-3xl border border-white/5 bg-white/[0.01] p-6 text-center"
                            >
                                <div className="text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2">50+</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Mock Sessions</div>
                            </motion.div>
                        </div>

                        {/* Column 2: Video Chat & Stat */}
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="w-full group relative rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 overflow-hidden hover:border-emerald-500/30 transition-colors duration-500 flex flex-col items-center text-center flex-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-8">
                                    🎥
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white mb-4">Video & Audio Calls</h3>
                                <p className="text-white/50 text-base leading-relaxed">
                                    Built-in WebRTC peer-to-peer connection. See and hear candidates clearly without relying on external apps.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full rounded-3xl border border-white/5 bg-white/[0.01] p-6 text-center"
                            >
                                <div className="text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-500 mb-2">3</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Languages Supported</div>
                            </motion.div>
                        </div>

                        {/* Column 3: AI & Stat */}
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full group relative rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 overflow-hidden hover:border-purple-500/30 transition-colors duration-500 flex flex-col items-center text-center flex-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-8">
                                    🧠
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white mb-4">AI Context Analysis</h3>
                                <p className="text-white/50 text-base leading-relaxed">
                                    Rapid code analysis and structured evaluation reports generated instantly with millisecond latency.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="w-full rounded-3xl border border-white/5 bg-white/[0.01] p-6 text-center"
                            >
                                <div className="text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 mb-2">~25ms</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Code Sync Speed</div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
       *  PAGE 3 — CTA
       * ═══════════════════════════════════════════ */}
            <section className="min-h-[80vh] flex items-center justify-center py-32 md:py-40 relative z-20 w-full px-4">
                <div className="w-full max-w-7xl mx-auto">
                    <ScrollReveal>
                        <MagneticGlow glowSize={500}>
                            <div
                                className="
                                    rounded-[40px] border border-white/10
                                    bg-[#030712]/80 backdrop-blur-2xl
                                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)]
                                    min-h-[60vh]
                                    flex flex-col items-center justify-center gap-6
                                    px-8 md:px-16 py-20
                                    text-center
                                    relative overflow-hidden
                                "
                            >
                                {/* Background glow orbs */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[13px] font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                                        Try It Out
                                    </span>

                                    <h2 className="font-heading text-6xl md:text-[80px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-4xl leading-[0.95] mb-8">
                                        Ready to Experience
                                        <br />
                                        the Platform?
                                    </h2>

                                    <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                                        Create a room, share the link, and start interviewing.
                                        It's entirely free and requires no sign-up for candidates.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto"
                                        >
                                            Create a Room Now
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
                                        >
                                            View Demo
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
            <footer className="relative border-t border-white/[0.06] w-full z-20 bg-[#030712]">
                <div className="page-container relative z-10 py-16 w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-4 gap-12 md:gap-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    I
                                </div>
                                <span className="font-heading text-lg font-bold text-white tracking-tight">InterviewPlatform</span>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed max-w-[260px] font-medium">
                                A premium full-stack technical interview environment.
                            </p>
                        </div>
                        {/* Footer Links - keeping structure the same for brevity */}
                        <div>
                            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6">Platform</h4>
                            <ul className="space-y-4">
                                {["Dashboard", "Create Room", "Join Room", "How It Works"].map((item) => (
                                    <li key={item}><a href="#" className="font-medium text-white/40 text-sm hover:text-white transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6">Tech Stack</h4>
                            <ul className="space-y-4">
                                {["React + Vite", "Node.js + Express", "WebRTC", "Monaco Editor"].map((item) => (
                                    <li key={item}><a href="#" className="font-medium text-white/40 text-sm hover:text-white transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-6">Connect</h4>
                            <ul className="space-y-4">
                                {["GitHub", "LinkedIn", "Twitter", "Email"].map((item) => (
                                    <li key={item}><a href="#" className="font-medium text-white/40 text-sm hover:text-white transition-colors duration-300">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/30 text-sm font-medium">Built as a premium college project · 2026</p>
                        <div className="flex items-center gap-6">
                            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                                <a key={social} href="#" className="text-white/30 text-sm font-medium hover:text-white transition-colors duration-300">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
