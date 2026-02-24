// =============================================
//  CursorGlow.jsx — Glowing Cursor Trail Effect
// =============================================
//
//  A soft purple/indigo glow orb that follows
//  the mouse with a smooth spring delay, plus
//  fading trail orbs behind it.
//
// =============================================

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Raw mouse position
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    // Main orb — fast spring
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

    // Trail orb 1 — medium spring
    const trail1X = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.8 });
    const trail1Y = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.8 });

    // Trail orb 2 — slow spring (furthest behind)
    const trail2X = useSpring(mouseX, { damping: 35, stiffness: 100, mass: 1.2 });
    const trail2Y = useSpring(mouseY, { damping: 35, stiffness: 100, mass: 1.2 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const orbStyle = (x, y, size, opacity, blur, gradient) => ({
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradient,
        filter: `blur(${blur}px)`,
        opacity: isVisible ? opacity : 0,
        pointerEvents: "none",
    });

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: "none",
                overflow: "hidden",
            }}
            aria-hidden="true"
        >
            {/* Trail orb 3 — largest, most transparent, furthest behind */}
            <motion.div
                style={orbStyle(
                    trail2X, trail2Y,
                    200, 0.15, 60,
                    "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)"
                )}
                transition={{ opacity: { duration: 0.4 } }}
            />

            {/* Trail orb 2 — medium */}
            <motion.div
                style={orbStyle(
                    trail1X, trail1Y,
                    120, 0.25, 40,
                    "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(139,92,246,0.25) 40%, transparent 70%)"
                )}
                transition={{ opacity: { duration: 0.3 } }}
            />

            {/* Main glow orb — brightest, closest to cursor */}
            <motion.div
                style={orbStyle(
                    smoothX, smoothY,
                    60, 0.5, 18,
                    "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(129,140,248,0.4) 30%, rgba(139,92,246,0.2) 60%, transparent 80%)"
                )}
                transition={{ opacity: { duration: 0.2 } }}
            />
        </div>
    );
};

export default CursorGlow;
