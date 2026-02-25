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

import { useState } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { executeCode } from "../utils/executeCode";

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

// ── Hover Aurora + Grid Background (Borrowed from Landing) ──
const RoomBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030712]">
        {/* Subtle grid */}
        <div className="absolute inset-0 z-10 opacity-[0.15]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        {/* Animated Aurora Orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-purple-600/30 blur-[150px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[10%] -right-[10%] w-[50%] h-[60%] rounded-full bg-cyan-600/30 blur-[150px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-[20%] left-[20%] w-[70%] h-[50%] rounded-full bg-pink-600/20 blur-[150px]" />
    </div>
);

const InterviewRoom = () => {
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [code, setCode] = useState("// Write your code here...\n");
    const [output, setOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        if (!code.trim()) return;
        setIsExecuting(true);
        setOutput("");
        setIsError(false);

        const result = await executeCode(language, code);

        if (result.success) {
            setOutput(result.output);
            setIsError(result.isError);
        } else {
            setOutput(result.output || "Execution failed.");
            setIsError(true);
        }
        setIsExecuting(false);
    };

    return (
        // ── Strict Dashboard Layout (No Window Scroll) ────────
        // h-[calc(100vh-80px)] ensures it exactly fills the remaining screen (Layout navbar is 80px)
        // overflow-hidden on the main container prevents the window from scrolling, fixing ALL overlap issues
        // py-2 (8px) ensures very tight margin against the Navbar
        <div className="h-[calc(100vh-80px)] w-full max-w-[1800px] mx-auto overflow-hidden flex flex-col lg:flex-row gap-6 px-6 lg:px-8 py-2 font-sans relative z-10">
            <RoomBackground />

            {/* ═══════════════════════════════════════
       *  LEFT SIDE — Code Editor (65% width)
       * ═══════════════════════════════════════ */}
            <motion.div
                className="flex-1 lg:w-[65%] flex flex-col h-full min-h-0 z-10"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
                {/* ── Editor Container ── */}
                {/* Restored relative positioning so exact layout bounds are respected */}
                <div className="flex-1 relative rounded-2xl flex flex-col p-[1px] overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0a0a0a]/90 backdrop-blur-2xl">
                    {/* Gradient Border */}
                    <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Inner Glass Container */}
                    <div className="relative flex flex-col w-full h-full bg-transparent overflow-hidden">
                        {/* ── Editor Top Bar ──────────────── */}
                        <div className="h-14 border-b border-white/10 flex justify-between items-center px-4 shrink-0 bg-gradient-to-r from-white/[0.05] to-transparent z-10">

                            {/* Left side — file info + Room ID */}
                            <div className="flex items-center gap-3">
                                {/* Language indicator dot */}
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="text-sm text-white/50 font-mono">
                                        main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'java'}
                                    </span>
                                </div>
                                {/* Separator */}
                                <div className="w-px h-5 bg-white/10" />

                                {/* Language selector */}
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="text-xs text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1 outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                                >
                                    <option value="javascript" className="bg-[#030712]">JavaScript</option>
                                    <option value="python" className="bg-[#030712]">Python</option>
                                    <option value="cpp" className="bg-[#030712]">C++</option>
                                    <option value="java" className="bg-[#030712]">Java</option>
                                </select>

                                {/* Theme selector */}
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="text-xs text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1 outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                                >
                                    <option value="vs-dark" className="bg-[#030712]">Dark Theme</option>
                                    <option value="light" className="bg-[#030712]">Light Theme</option>
                                    <option value="hc-black" className="bg-[#030712]">High Contrast</option>
                                </select>

                                {/* Separator */}
                                <div className="w-px h-5 bg-white/10" />
                                {/* Room ID */}
                                <span className="text-xs text-white/25 font-mono">
                                    Room: ABC-123
                                </span>
                            </div>

                            {/* Right side — action buttons */}
                            <div className="flex items-center gap-3">
                                {/* Run Code button — Stylish & Colorful */}
                                <motion.button
                                    onClick={runCode}
                                    disabled={isExecuting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className={`
                flex items-center gap-2
                rounded-lg px-5 py-2
                text-sm font-bold tracking-wide
                shadow-[0_0_20px_rgba(56,189,248,0.4)]
                border border-white/20
                transition-all duration-300
                ${isExecuting ? "bg-white/10 text-white/50 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white cursor-pointer"}
              `}
                                >
                                    {/* Play icon or Spinner */}
                                    {isExecuting ? (
                                        <svg className="w-4 h-4 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    )}
                                    <span className="relative z-10">{isExecuting ? "Executing..." : "Run Code"}</span>
                                </motion.button>

                                {/* End Interview button — Stylish & Colorful */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="
                flex items-center gap-2
                bg-gradient-to-r from-rose-500/20 to-red-600/20 text-rose-300
                border border-rose-500/40
                hover:from-rose-500/40 hover:to-red-600/40 hover:text-white
                rounded-lg px-5 py-2
                text-sm font-bold tracking-wide
                shadow-[0_0_15px_rgba(244,63,94,0.3)]
                cursor-pointer
                transition-all duration-300
              "
                                >
                                    {/* X icon */}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    End
                                </motion.button>
                            </div>
                        </div>

                        {/* ── Editor Main Area ────────────── */}
                        <div className="flex-1 w-full relative">
                            <Editor
                                height="100%"
                                language={language}
                                theme={theme}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                    fontLigatures: true,
                                    padding: { top: 24, bottom: 24 },
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    cursorSmoothCaretAnimation: "on",
                                    formatOnPaste: true,
                                    wordWrap: "on",
                                    lineHeight: 24,
                                    scrollbar: {
                                        verticalScrollbarSize: 8,
                                        horizontalScrollbarSize: 8,
                                    }
                                }}
                                loading={
                                    <div className="flex items-center justify-center h-full w-full text-white/40">
                                        <span className="animate-pulse flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                            Loading Editor...
                                        </span>
                                    </div>
                                }
                            />
                        </div>

                    </div>
                </div>

                {/* ── Output / Terminal Area ────────── */}
                <div className="h-[180px] xl:h-[200px] rounded-2xl border border-white/10 bg-[#050505]/95 backdrop-blur-2xl shadow-xl flex flex-col shrink-0 relative overflow-hidden">
                    {/* Inner glowing top border for depth */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
                    <div className="h-12 border-b border-white/5 flex items-center px-6 bg-white/[0.02] shrink-0">
                        <span className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                            Terminal Output
                        </span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-[13px] leading-relaxed relative">
                        {isExecuting ? (
                            <div className="flex items-center gap-3 text-white/50 animate-pulse">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Executing dynamically...
                            </div>
                        ) : output ? (
                            <pre className={`whitespace-pre-wrap ${isError ? "text-red-400" : "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"}`}>
                                {output}
                            </pre>
                        ) : (
                            <span className="text-white/20 italic select-none">Click "Run Code" to compile and execute your solution...</span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════
       *  RIGHT SIDE — Video + Chat (35% width)
       * ═══════════════════════════════════════ */}
            <div className="w-full lg:w-[35%] flex flex-col gap-4 h-full min-h-0 overflow-y-auto pr-2 custom-scrollbar">

                {/* ── Video Grid (Vertical Stack) ─────── */}
                <div className="flex flex-col gap-4 shrink-0">
                    {/* Host Video */}
                    <motion.div
                        className="aspect-video rounded-xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 relative overflow-hidden shrink-0 group shadow-lg"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                <span className="text-xl">🧑‍💻</span>
                            </div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 text-xs font-medium text-white flex items-center gap-2 border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            You (Host)
                        </div>
                    </motion.div>

                    {/* Remote Video */}
                    <motion.div
                        className="aspect-video rounded-xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 relative overflow-hidden shrink-0 group shadow-lg"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                <span className="text-xl">👩‍💻</span>
                            </div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 text-xs font-medium text-white flex items-center gap-2 border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Alex Johnson
                        </div>
                    </motion.div>
                </div>

                {/* ── Media Controls Toolbar ──────── */}
                <motion.div
                    className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-4 shrink-0 shadow-lg"
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
                    className="flex-1 min-h-[300px] rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 flex flex-col overflow-hidden shadow-lg relative shrink-0"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                >
                    {/* Glowing Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

                    {/* Chat header */}
                    <div className="h-12 border-b border-white/10 flex items-center px-5 shrink-0 bg-white/[0.02]">
                        <span className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-sm">💬</span>
                            Live Chat
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
