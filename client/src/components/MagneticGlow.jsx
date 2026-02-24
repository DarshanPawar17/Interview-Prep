// =============================================
//  MagneticGlow.jsx — Cursor-Following Card Glow
// =============================================
//
//  Wrap any card/element with <MagneticGlow> and
//  a radial spotlight will follow the mouse within
//  that element's bounds. The glow fades when the
//  cursor leaves. Used by Stripe, Vercel, etc.
//
//  Usage:
//    <MagneticGlow>
//      <div className="my-card">...</div>
//    </MagneticGlow>
//
// =============================================

import { useRef, useState, useCallback } from "react";

const MagneticGlow = ({ children, glowColor = "rgba(139, 92, 246, 0.15)", glowSize = 250 }) => {
    const containerRef = useRef(null);
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setGlowPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
        >
            {/* The glow overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: glowPos.x - glowSize / 2,
                        top: glowPos.y - glowSize / 2,
                        width: glowSize,
                        height: glowSize,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                    }}
                />
            </div>
            {/* The actual card content */}
            {children}
        </div>
    );
};

export default MagneticGlow;
