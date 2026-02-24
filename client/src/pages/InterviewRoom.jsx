// =============================================
//  InterviewRoom.jsx — Live Interview Workspace
// =============================================
//
//  Spec: h-screen overflow-hidden layout
//  Left Panel (70%): Monaco Editor with:
//    - Room ID display in top bar
//    - Glowing gradient "Run Code" button
//  Right Panel (30%): Video grid + Chat
//    - aspect-video panels for proper sizing
//    - Pill-shaped media control toolbar
//
//  This file is PURE UI — no WebRTC/Socket logic.
// =============================================

import { motion } from "framer-motion";

// ── Entrance animation for panels ─────────────
const panelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay, ease: "easeOut" },
    }),
};

// ── Dummy chat messages ───────────────────────
const DUMMY_MESSAGES = [
    { id: 1, sender: "You", text: "Hi! Can you start with a two-sum approach?", time: "2:01 PM" },
    { id: 2, sender: "Alex", text: "Sure, I'll use a hash map for O(n) time.", time: "2:02 PM" },
    { id: 3, sender: "You", text: "Great, let's see the implementation.", time: "2:03 PM" },
];

const InterviewRoom = () => {
    return (
        // ── Full-screen container ──────────────
        // h-screen + pt-24 accounts for the fixed h-20 navbar
        // overflow-hidden prevents any scroll on the room
        <div className="h-screen w-full bg-background overflow-hidden flex pt-24">

            {/* ═══════════════════════════════════════
       *  LEFT SIDE — Code Editor (70% width)
       * ═══════════════════════════════════════ */}
            <motion.div
                className="w-[70%] m-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col overflow-hidden"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
                {/* ── Editor Top Bar ──────────────── */}
                <div className="h-12 border-b border-white/10 flex justify-between items-center px-4 bg-white/[0.02] shrink-0">

                    {/* Left side — file info + Room ID */}
                    <div className="flex items-center gap-3">
                        {/* Language indicator dot */}
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="text-sm text-white/50 font-mono">main.js</span>
                        </div>
                        {/* Separator */}
                        <div className="w-px h-5 bg-white/10" />
                        {/* Language selector */}
                        <span className="text-xs text-white/30 bg-white/5 rounded-md px-2 py-1">
                            JavaScript
                        </span>
                        {/* Separator */}
                        <div className="w-px h-5 bg-white/10" />
                        {/* Room ID */}
                        <span className="text-xs text-white/25 font-mono">
                            Room: ABC-123
                        </span>
                    </div>

                    {/* Right side — action buttons */}
                    <div className="flex items-center gap-2">
                        {/* Run Code button — Glowing gradient per spec */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="
                btn-glow-primary
                flex items-center gap-1.5
                rounded-lg px-3 py-1.5
                text-xs font-medium
                cursor-pointer
              "
                        >
                            {/* Play icon */}
                            <svg className="w-3.5 h-3.5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            <span className="relative z-10">Run Code</span>
                        </motion.button>

                        {/* End Interview button — red accent */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="
                flex items-center gap-1.5
                bg-red-500/20 text-red-400
                border border-red-500/30
                hover:bg-red-500/30
                rounded-lg px-3 py-1.5
                text-xs font-medium
                cursor-pointer
                transition-colors duration-200
              "
                        >
                            {/* X icon */}
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            End
                        </motion.button>
                    </div>
                </div>

                {/* ── Editor Main Area ────────────── */}
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Background code lines (decorative) */}
                    <div className="absolute inset-0 opacity-[0.03] font-mono text-xs leading-6 p-6 overflow-hidden pointer-events-none select-none" aria-hidden="true">
                        {Array.from({ length: 30 }, (_, i) => (
                            <div key={i} className="whitespace-nowrap">
                                <span className="text-white/20 mr-6 inline-block w-6 text-right">{i + 1}</span>
                                {i === 0 && "function twoSum(nums, target) {"}
                                {i === 1 && "  const map = new Map();"}
                                {i === 2 && "  for (let i = 0; i < nums.length; i++) {"}
                                {i === 3 && "    const complement = target - nums[i];"}
                                {i === 4 && "    if (map.has(complement)) {"}
                                {i === 5 && "      return [map.get(complement), i];"}
                                {i === 6 && "    }"}
                                {i === 7 && "    map.set(nums[i], i);"}
                                {i === 8 && "  }"}
                                {i === 9 && "  return [];"}
                                {i === 10 && "}"}
                                {i > 10 && ""}
                            </div>
                        ))}
                    </div>

                    {/* Centered placeholder text */}
                    <div className="text-center z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mx-auto mb-4">
                            ⌨️
                        </div>
                        <p className="text-white/40 text-sm font-medium">Monaco Editor Goes Here</p>
                        <p className="text-white/20 text-xs mt-1">Integrate with @monaco-editor/react</p>
                    </div>
                </div>

                {/* ── Output / Terminal Bar ────────── */}
                <div className="h-10 border-t border-white/10 bg-white/[0.02] flex items-center px-4 shrink-0">
                    <span className="text-xs text-white/25 font-mono">{">"} Ready</span>
                </div>
            </motion.div>


            {/* ═══════════════════════════════════════
       *  RIGHT SIDE — Video & Chat (30% width)
       * ═══════════════════════════════════════ */}
            <div className="w-[30%] my-4 mr-4 flex flex-col gap-4">

                {/* ── Video Grid ──────────────────── */}
                {/* aspect-video for proper responsive sizing */}
                <motion.div
                    className="aspect-video rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 relative overflow-hidden shrink-0 group"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 text-xs text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        You (Host)
                    </div>
                </motion.div>

                <motion.div
                    className="aspect-video rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 relative overflow-hidden shrink-0 group"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 text-xs text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Alex Johnson
                    </div>
                </motion.div>

                {/* ── Media Controls Toolbar ──────── */}
                <motion.div
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full h-14 flex items-center justify-center gap-4 px-6 shrink-0"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                >
                    {/* Mic button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="
              w-10 h-10 rounded-full
              bg-white/10 border border-white/10
              flex items-center justify-center
              hover:bg-white/15 hover:border-white/20
              transition-all duration-200
              cursor-pointer
            "
                        title="Toggle Microphone"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        </svg>
                    </motion.button>

                    {/* Camera button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="
              w-10 h-10 rounded-full
              bg-white/10 border border-white/10
              flex items-center justify-center
              hover:bg-white/15 hover:border-white/20
              transition-all duration-200
              cursor-pointer
            "
                        title="Toggle Camera"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
                        </svg>
                    </motion.button>

                    {/* Screen Share button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="
              w-10 h-10 rounded-full
              bg-white/10 border border-white/10
              flex items-center justify-center
              hover:bg-white/15 hover:border-white/20
              transition-all duration-200
              cursor-pointer
            "
                        title="Share Screen"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
                        </svg>
                    </motion.button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10" />

                    {/* Leave Room button — red */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="
              w-10 h-10 rounded-full
              bg-red-500/20 border border-red-500/30
              flex items-center justify-center
              hover:bg-red-500/30
              transition-all duration-200
              cursor-pointer
            "
                        title="Leave Room"
                    >
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </motion.button>
                </motion.div>

                {/* ── Chat Panel ──────────────────── */}
                <motion.div
                    className="flex-1 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                >
                    {/* Chat header */}
                    <div className="h-10 border-b border-white/10 flex items-center px-4 shrink-0">
                        <span className="text-xs font-medium text-white/40">
                            💬 Live Chat
                        </span>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                        {DUMMY_MESSAGES.map((msg) => (
                            <div key={msg.id} className="flex flex-col">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xs font-medium text-white">{msg.sender}</span>
                                    <span className="text-[10px] text-white/20">{msg.time}</span>
                                </div>
                                <p className="text-sm text-white/50 leading-relaxed">{msg.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chat input */}
                    <div className="h-12 border-t border-white/10 flex items-center px-4 gap-2 shrink-0">
                        <input
                            type="text"
                            placeholder="Type a message…"
                            className="
                flex-1
                bg-transparent
                text-sm text-white
                placeholder:text-white/20
                outline-none
                font-sans
              "
                            disabled
                        />
                        <button
                            className="
                w-8 h-8 rounded-lg
                bg-white/10
                flex items-center justify-center
                hover:bg-white/15
                transition-colors duration-200
                cursor-pointer
              "
                        >
                            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InterviewRoom;
