// =============================================
//  tailwind.config.js — Design System Configuration
// =============================================
//
//  This file extends Tailwind's default theme with our
//  custom design tokens.  Every value here becomes a
//  utility class you can use in JSX:
//
//    bg-background   →  #050505
//    text-muted      →  #A1A1AA
//    shadow-glow     →  the custom glow shadow
//    font-heading    →  "Plus Jakarta Sans"
//
//  NOTE (Tailwind CSS v4):
//    Tailwind v4 natively uses CSS @theme{} blocks for
//    configuration (no JS file needed).  However, we
//    reference this file from index.css with @config so
//    you can keep a familiar JS config workflow.
// =============================================

/** @type {import('tailwindcss').Config} */
export default {
    // ── Content Paths ─────────────────────────────
    // Tailwind scans these files to tree-shake unused classes.
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

    // ── Theme Extensions ──────────────────────────
    // "extend" merges with defaults so you keep all of
    // Tailwind's built-in utilities AND add your own.
    theme: {
        extend: {
            // ────────────────────────────────────────────
            //  COLORS — Premium dark-mode palette
            // ────────────────────────────────────────────
            //  Inspired by the Portfolite Framer aesthetic:
            //  pitch-black base, minimal white foreground,
            //  subtle zinc muted tones.
            colors: {
                background: "#050505",       // Pitch black — main page bg
                surface: {
                    DEFAULT: "#111111",        // Dark gray — card/section bg
                    light: "#1A1A1A",          // Slightly lighter — hover states
                },
                primary: "#FFFFFF",          // High-contrast white — text & buttons
                muted: "#A1A1AA",            // Zinc-400 — secondary/descriptive text
                border: "rgba(255, 255, 255, 0.08)", // Subtle white border
            },

            // ────────────────────────────────────────────
            //  FONTS — Dual-font typographic system
            // ────────────────────────────────────────────
            //  • "Plus Jakarta Sans" for headings (geometric, bold)
            //  • "Inter" for body text (clean, highly readable)
            //  • "JetBrains Mono" for code blocks (editor feel)
            fontFamily: {
                heading: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
                sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
                mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
            },

            // ────────────────────────────────────────────
            //  SHADOWS — Premium glow & glassmorphism
            // ────────────────────────────────────────────
            //  glow  → outer ambient light diffusion (hero, buttons)
            //  glass → inner top-edge highlight (card depth illusion)
            boxShadow: {
                glow: "0 0 40px -10px rgba(255, 255, 255, 0.1)",
                glass: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                "glow-sm": "0 0 20px -5px rgba(255, 255, 255, 0.07)",
                "glow-lg": "0 0 60px -15px rgba(255, 255, 255, 0.15)",
                "glow-primary": "0 0 40px -10px rgba(255, 255, 255, 0.2)",
            },

            // ────────────────────────────────────────────
            //  BORDER RADIUS — Consistent rounded corners
            // ────────────────────────────────────────────
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },

            // ────────────────────────────────────────────
            //  ANIMATIONS — Framer-style micro-interactions
            // ────────────────────────────────────────────
            //  These keyframes power subtle entrance, hover
            //  and background animations throughout the UI.
            keyframes: {
                // Smooth fade-in from below (for sections on scroll)
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                // Smooth fade-in from above
                "fade-in-down": {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                // Simple opacity fade
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                // Scale-in for modals & popups
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                // Slide-in from left (nav menus, drawers)
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                // Slide-in from right
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                // Slow-moving radial gradient mesh (background animation)
                "mesh-move": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                // Gentle float for decorative elements
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                // Pulsing glow for active/live indicators
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)" },
                    "50%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" },
                },
                // Shimmer loading skeleton
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                // Marquee / infinite scroll for ticker / tag strips
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center"
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center"
                    },
                },
                "spin-slow": {
                    "from": {
                        "transform": "rotate(0deg)"
                    },
                    "to": {
                        "transform": "rotate(360deg)"
                    },
                }
            },

            // Map keyframes → animation utility classes
            animation: {
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "fade-in-down": "fade-in-down 0.6s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "scale-in": "scale-in 0.3s ease-out forwards",
                "slide-in-left": "slide-in-left 0.5s ease-out forwards",
                "slide-in-right": "slide-in-right 0.5s ease-out forwards",
                "mesh-move": "mesh-move 20s ease infinite",
                float: "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                shimmer: "shimmer 2s linear infinite",
                marquee: "marquee 30s linear infinite",
                "gradient-x": "gradient-x 15s ease infinite",
                "spin-slow": "spin-slow 6s linear infinite",
            },

            // ────────────────────────────────────────────
            //  SPACING & SIZING — Content width constraints
            // ────────────────────────────────────────────
            maxWidth: {
                container: "1280px",   // Main content container
                narrow: "768px",       // Text-heavy sections
                wide: "1440px",        // Full-bleed sections
            },

            // ────────────────────────────────────────────
            //  TRANSITIONS — Consistent durations
            // ────────────────────────────────────────────
            transitionDuration: {
                DEFAULT: "200ms",
                fast: "100ms",
                slow: "500ms",
            },

            // ────────────────────────────────────────────
            //  BACKDROP BLUR — Glassmorphism levels
            // ────────────────────────────────────────────
            backdropBlur: {
                xs: "2px",
                sm: "4px",
                DEFAULT: "8px",
                md: "12px",
                lg: "16px",
                xl: "24px",
            },
        },
    },

    // ── Plugins ───────────────────────────────────
    plugins: [],
};
