// =============================================
//  Navbar.jsx — Full-Width Glassmorphic Navigation
// =============================================
//
//  Spec: h-20, fixed top-0 w-full z-50
//  bg-black/50 backdrop-blur-xl border-b border-white/5
//  Animated underline hover on nav links
//  Glowing gradient CTA button
//  Hamburger menu for mobile
// =============================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ── Navigation link data ──────────────────────
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Rooms", href: "/rooms" },
    { label: "About", href: "/about" },
];

// ── Nav link with animated underline toggle ───
const NavLink = ({ label, href }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative font-sans text-[14px] tracking-wide whitespace-nowrap py-2 px-1"
        >
            {/* Text with smooth color toggle + scale pop + glow */}
            <motion.span
                animate={{
                    color: isHovered ? "#ffffff" : "rgba(255,255,255,0.5)",
                    textShadow: isHovered
                        ? "0 0 12px rgba(139,92,246,0.6), 0 0 30px rgba(99,102,241,0.3)"
                        : "0 0 0px transparent",
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="inline-block"
            >
                {label}
            </motion.span>

            {/* Animated underline that slides in from left on hover */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-white/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
        </Link>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav
            className="
        fixed top-0 left-0 right-0 z-50
        h-20
        bg-black/50
        backdrop-blur-xl
        border-b border-white/[0.05]
        flex justify-between items-center
        px-8 md:px-12
      "
        >
            {/* ── Logo / Brand ───────────────────── */}
            <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ transformOrigin: "left center" }}
                className="ml-2"
            >
                <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                    <span className="text-white/80 text-lg">⊞</span>
                    <span
                        className="
                font-heading text-[16px] font-semibold tracking-tight text-white
                group-hover:text-white/80 transition-colors duration-300
                group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]
              "
                    >
                        InterviewPlatform
                    </span>
                </Link>
            </motion.div>

            {/* ── Desktop Navigation Links ───────── */}
            <div className="hidden md:flex items-center gap-8 shrink-0">
                {NAV_LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} href={link.href} />
                ))}
            </div>

            {/* ── CTA Buttons (Desktop) ────────── */}
            <div className="hidden md:flex items-center gap-3 shrink-0 ml-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                    }}
                    className="btn-glass-ghost text-[12px] font-medium px-4 py-1.5"
                >
                    <span className="relative z-10">Log In</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                    }}
                    className="btn-glass-ghost text-[12px] font-medium px-4 py-1.5"
                >
                    <span className="relative z-10">Sign In</span>
                </motion.button>
            </div>

            {/* ── Mobile Menu Toggle (Hamburger) ── */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 shrink-0"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-[2px] bg-white rounded-full origin-center"
                />
                <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-5 h-[2px] bg-white rounded-full"
                />
                <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="block w-5 h-[2px] bg-white rounded-full origin-center"
                />
            </button>

            {/* ── Mobile Menu Dropdown ──────────── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="
              absolute top-full left-0 right-0
              bg-black/60 backdrop-blur-2xl
              border-b border-white/[0.06]
              flex flex-col items-center gap-6
              py-8
              md:hidden
            "
                    >
                        {NAV_LINKS.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="
                    font-sans text-[14px] text-white/50
                    hover:text-white
                    transition-colors duration-300
                  "
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Mobile CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="btn-glow-primary text-[13px] font-medium px-5 py-2 mt-2"
                        >
                            <span className="relative z-10">Sign In</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
