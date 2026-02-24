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

import { useState, useEffect } from "react";
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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Hide if scrolling down past 80px, show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: isVisible ? 0 : "-100%",
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="
                fixed top-0 left-0 right-0 z-50
                h-20
                bg-white/[0.01] hover:bg-white/[0.03] text-white/90 
                backdrop-blur-2xl
                border-b border-white/[0.05]
                flex justify-between items-center
                px-8 md:px-12
                transition-colors duration-500
                hover:shadow-[0_4px_30px_rgba(255,255,255,0.05)]
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
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    {/* Creative logo: chat bubble with code brackets = interview + coding */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-rose-500 flex items-center justify-center shadow-[0_0_18px_rgba(167,139,250,0.5)] group-hover:shadow-[0_0_30px_rgba(167,139,250,0.7)] transition-shadow duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Chat bubble outline */}
                            <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.964L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Code brackets inside */}
                            <path d="M9.5 10L7.5 12l2 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.5 10l2 2-2 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {/* Gradient brand text with glow */}
                    <span
                        className="
                font-heading text-[17px] font-bold tracking-tight
                bg-gradient-to-r from-white via-blue-200 to-indigo-300
                bg-clip-text text-transparent
                drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]
                group-hover:drop-shadow-[0_0_16px_rgba(139,92,246,0.6)]
                transition-all duration-300
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
        </motion.nav>
    );
};

export default Navbar;
