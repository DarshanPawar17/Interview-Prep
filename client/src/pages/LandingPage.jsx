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
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mt-24 w-full max-w-2xl mx-auto"
                        >
                            {/* Primary CTA (Create a Room) */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={buttonSpring}
                                className="relative w-full sm:w-auto overflow-hidden rounded-2xl group flex justify-center p-[2px]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-rose-500 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity blur-[2px]" />
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-rose-500 rounded-2xl animate-pulse" />
                                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-[14px] w-full h-full px-16 py-7 flex flex-row items-center justify-center gap-4 text-center">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-wide text-center">
                                        Create a Room
                                    </span>
                                    <span className="text-2xl text-white group-hover:translate-x-1.5 transition-transform flex-shrink-0">→</span>
                                </div>
                            </motion.button>

                            {/* Removed Secondary CTA (View Demo) as per user request */}
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

                                    <div className="flex w-full items-center justify-center pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-14 py-6 rounded-[20px] bg-white text-black font-extrabold text-xl hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.4)] w-auto min-w-[300px] text-center"
                                        >
                                            Create a Room Now
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </MagneticGlow>
                    </ScrollReveal>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
       *  FOOTER (Reference Image Variant)
       * ═══════════════════════════════════════════ */}
            <footer className="relative w-full z-20 bg-[#030712] overflow-hidden pt-24 pb-12 border-t border-white/[0.05]">

                {/* Floor ambient glow radiating upwards */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[250px] bg-gradient-to-t from-cyan-600/10 via-purple-600/5 to-transparent rounded-[100%] blur-[80px] pointer-events-none opacity-40" />

                <div className="page-container relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">

                        {/* Left Section: Logo & Copyright */}
                        <div className="md:w-1/3 flex flex-col justify-between items-start shrink-0">
                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-4 cursor-pointer mb-16 md:mb-0"
                            >
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-rose-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                    <span className="absolute inset-[1.5px] rounded-[10px] bg-gray-900/80 backdrop-blur-sm z-0"></span>
                                    <span className="relative z-10 font-heading text-lg font-black text-white">I</span>
                                </div>
                                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                                    InterviewPlatform
                                </span>
                            </motion.div>

                            {/* Copyright (Hidden on mobile, pushed to bottom) */}
                            <div className="hidden md:flex flex-col gap-2 text-white/50 text-sm mt-24">
                                <p>Copyright &copy; {new Date().getFullYear()}</p>
                                <p className="text-xs font-medium tracking-wide">Build faster. Land offers.</p>
                            </div>
                        </div>

                        {/* Right Section: Links, Button, Line, Socials */}
                        <div className="md:w-2/3 flex flex-col w-full">

                            {/* Links & Button Row */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 w-full">

                                {/* Links Grid Container */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-5">
                                    {[
                                        { label: "Home", url: "/" },
                                        { label: "App Dashboard", url: "/dashboard" },
                                        { label: "Contact us", url: "mailto:darshanpawar@example.com" },
                                        { label: "How it works", url: "#" },
                                        { label: "Privacy policy", url: "#" },
                                        { label: "Project source", url: "https://github.com/DarshanPawar17/Interview-Prep" }
                                    ].map((item, i) => (
                                        <a key={i} href={item.url} className="flex items-center gap-3 group">
                                            <span className="w-[1.5px] h-[14px] bg-cyan-400/30 group-hover:bg-cyan-400 transition-colors"></span>
                                            <span className="font-medium text-white/60 text-sm group-hover:text-white transition-colors duration-300">
                                                {item.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                {/* Contact Button */}
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="mailto:darshanpawar@example.com"
                                    className="shrink-0 bg-[#FF9D85] text-[#030712] font-semibold tracking-wide text-sm px-8 py-3 rounded hover:bg-[#ffb09e] transition-colors shadow-lg"
                                >
                                    CONTACT US
                                </motion.a>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-[1px] bg-white/10 mt-20 mb-6"></div>

                            {/* Social Icons aligned right */}
                            <div className="flex justify-between md:justify-end items-center w-full">
                                {/* Mobile Copyright */}
                                <div className="md:hidden flex flex-col gap-1 text-white/50 text-xs">
                                    <p>Copyright &copy; {new Date().getFullYear()}</p>
                                    <p>Build faster. Land offers.</p>
                                </div>

                                <div className="flex items-center gap-6 text-white/60">
                                    <a href="#" className="hover:text-cyan-400 transition-colors" title="Twitter">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </a>
                                    <a href="#" className="hover:text-pink-400 transition-colors" title="Instagram">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                    </a>
                                    <a href="https://github.com/DarshanPawar17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    </a>
                                    <a href="https://linkedin.com/in/darshanpawar" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" title="LinkedIn">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
