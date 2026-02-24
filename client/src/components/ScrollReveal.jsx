// =============================================
//  ScrollReveal.jsx — Reusable Scroll Animation
// =============================================
//
//  Wraps any content in a Framer Motion container
//  that fades in from below when it enters the viewport.
//
//  Usage:
//    <ScrollReveal>
//      <h2>Content here</h2>
//    </ScrollReveal>
//
//  Props:
//    • delay   — seconds to delay the animation (default: 0)
//    • y       — initial Y offset in pixels (default: 40)
//    • className — additional CSS classes
//
// =============================================

import { motion } from "framer-motion";

const ScrollReveal = ({
    children,
    delay = 0,
    y = 40,
    className = "",
}) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
            duration: 0.7,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export default ScrollReveal;
