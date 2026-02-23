// =============================================
//  Layout.jsx — Global Page Wrapper
// =============================================
//
//  Portfolite-style layout with three layers:
//
//    LAYER 0: Fixed video background (dark fluid smoke)
//    LAYER 1: Blue vignette glow overlay
//    LAYER 2: Animated film grain noise
//    LAYER 3: Page content (Navbar + routes)
//
// =============================================

import { motion } from "framer-motion";
import Navbar from "./Navbar";

// ── Page transition variants ──────────────────
const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.5,
        ease: "easeOut",
    },
};

// ── Dark smoke/fog video on black background ──
// Pexels 7122113: subtle drifting fog/smoke in dark space — 
// atmospheric, slowly moving, pure black bg with white wisps.
const VIDEO_URL =
    "https://videos.pexels.com/video-files/7122113/7122113-uhd_2560_1440_30fps.mp4";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative">
            {/* LAYER 0 — Video Background */}
            <div className="video-bg-container">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                </video>
            </div>

            {/* LAYER 1 — Blue Vignette Glow */}
            <div className="vignette-overlay" aria-hidden="true" />

            {/* LAYER 2 — Film Grain Noise */}
            <div className="grain-overlay" aria-hidden="true" />

            {/* LAYER 3 — Actual Page Content */}
            <div className="content-layer">
                <Navbar />
                <motion.main
                    className="pt-20"
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    transition={pageTransition.transition}
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
};

export default Layout;
