// =============================================
//  Dashboard.jsx — Bento Box Grid Dashboard
// =============================================
//
//  Spec: Vibrant, Colorful, Professional Layout
//    • Mesh gradient animated background
//    • Holographic glassmorphic cards
//    • Modern 3D Avatars and pill badges
//
// =============================================

import { motion } from "framer-motion";

// ── Hover Aurora Background Component ─────────
const AuroraBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/30 blur-[130px]"
        />
        <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-600/30 blur-[130px]"
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-600/30 blur-[130px]"
        />
    </div>
);

// ── Stagger container ─────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// ── Individual card entrance ──────────────────
const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ── Holographic Premium BentoCard ─────────────
const BentoCard = ({ children, className = "" }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{
            y: -5,
            transition: { duration: 0.3, ease: "easeOut" },
        }}
        className={`
      rounded-3xl
      border border-white/10
      bg-white/[0.02] backdrop-blur-3xl
      p-6 md:p-8
      relative
      shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.15)]
      hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(0,242,254,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.2)]
      transition-all duration-300
      overflow-hidden
      group
      ${className}
    `}
    >
        {/* Animated Gradient Fill on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Subtle inner top glow */}
        <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            aria-hidden="true"
        />
        <div className="relative z-10 w-full h-full flex flex-col">
            {children}
        </div>
    </motion.div>
);

// ── Colorful Arrays ───────────────────────────
const PRACTICE_PROBLEMS = [
    { id: 1, title: "Two Sum", difficulty: "Easy", diffClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", tag: "Arrays", tagClass: "text-blue-400 bg-blue-400/10 border-blue-400/20", progress: 100, icon: "🎯", gradient: "from-[#00f2fe] to-[#4facfe]" },
    { id: 2, title: "Valid Parentheses", difficulty: "Medium", diffClass: "text-amber-400 bg-amber-400/10 border-amber-400/20", tag: "Stacks", tagClass: "text-purple-400 bg-purple-400/10 border-purple-400/20", progress: 75, icon: "📦", gradient: "from-[#a855f7] to-[#f093fb]" },
    { id: 3, title: "Merge Intervals", difficulty: "Medium", diffClass: "text-amber-400 bg-amber-400/10 border-amber-400/20", tag: "Sorting", tagClass: "text-pink-400 bg-pink-400/10 border-pink-400/20", progress: 40, icon: "🔄", gradient: "from-[#f093fb] to-[#f5576c]" },
    { id: 4, title: "BFS Shortest Path", difficulty: "Hard", diffClass: "text-rose-400 bg-rose-400/10 border-rose-400/20", tag: "Graphs", tagClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", progress: 15, icon: "🕸️", gradient: "from-[#fa709a] to-[#fee140]" },
    { id: 5, title: "Binary Tree Inorder", difficulty: "Easy", diffClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", tag: "Trees", tagClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", progress: 90, icon: "🌳", gradient: "from-[#43e97b] to-[#38f9d7]" },
];

const RECENT_INTERVIEWS = [
    { id: 1, candidate: "Alex Johnson", role: "Frontend Engineer", date: "Feb 22", status: "Completed", statusClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", avatarGradient: "from-cyan-400 to-blue-500", seed: "Lucy" },
    { id: 2, candidate: "Maria Garcia", role: "Full Stack Dev", date: "Feb 21", status: "Reviewing", statusClass: "text-amber-400 bg-amber-400/10 border-amber-400/20", avatarGradient: "from-amber-400 to-orange-500", seed: "Mia" },
    { id: 3, candidate: "Sam Williams", role: "Backend Engineer", date: "Feb 20", status: "Completed", statusClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", avatarGradient: "from-blue-400 to-indigo-500", seed: "Felix" },
    { id: 4, candidate: "Priya Patel", role: "DevOps Engineer", date: "Feb 19", status: "Cancelled", statusClass: "text-rose-400 bg-rose-400/10 border-rose-400/20", avatarGradient: "from-rose-400 to-pink-500", seed: "Aneka" },
    { id: 5, candidate: "Jordan Lee", role: "ML Engineer", date: "Feb 18", status: "Completed", statusClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", avatarGradient: "from-purple-400 to-pink-500", seed: "Buster" },
];

const Dashboard = () => {
    return (
        <>
            <AuroraBackground />

            <section
                className="max-w-[1440px] w-full mx-auto pb-16 px-6 md:px-10 relative z-10 flex flex-col flex-1 overflow-x-hidden"
                style={{ marginTop: '120px' }}
            >
                {/* ── Page Header ─────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 md:mb-10"
                >
                    <span className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[12px] font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Overview Module
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tighter text-white drop-shadow-md">
                        Welcome back 👋
                    </h1>
                    <p className="text-white/60 text-lg font-light mt-3">
                        Here's a vibrant overview of your interview activity.
                    </p>
                </motion.div>

                {/* ── Grid Layout: 4/12 (Left) and 8/12 (Right) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 w-full flex-1">

                    {/* ── LEFT COLUMN (col-span-4) ── */}
                    <motion.div
                        className="flex flex-col gap-6 md:gap-8 col-span-1 lg:col-span-4 xl:col-span-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* 1. VIBRANT PROFILE CARD */}
                        <BentoCard className="flex flex-col min-h-[180px]">
                            <div className="flex flex-col items-center justify-center h-full text-center flex-1">
                                <div className="relative w-24 h-24 mb-4">
                                    {/* Gradient animated ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[3px] animate-[spin_4s_linear_infinite]" />
                                    {/* Avatar Inner */}
                                    <div className="absolute inset-[3px] rounded-full bg-[#0a0f1a] overflow-hidden flex items-center justify-center">
                                        <img
                                            src="https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=transparent"
                                            alt="Profile"
                                            className="w-full h-full object-cover scale-110 translate-y-2"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-[#030712] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                </div>

                                <h3 className="font-heading text-white text-[19px] font-bold drop-shadow-sm">Your Profile</h3>
                                <p className="text-white/60 text-[13px] mt-1 mb-4 font-medium">Senior Engineer</p>
                                <button className="text-[12.5px] font-semibold text-white bg-white/5 border border-white/10 rounded-full px-5 py-2 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:text-cyan-300 transition-all duration-300">
                                    Edit Profile
                                </button>
                            </div>
                        </BentoCard>

                        {/* 2. WAVE STREAK CHART CARD */}
                        <BentoCard className="flex flex-col h-[180px] relative">
                            <div className="flex flex-col justify-start flex-1 relative z-20 px-1 pt-1">
                                <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-center md:text-left drop-shadow-sm">
                                    Current Streak
                                </p>
                                <div className="flex items-end gap-2 justify-center md:justify-start">
                                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-heading leading-tight drop-shadow-lg">14</span>
                                    <span className="text-white/60 text-[14px] mb-2 font-semibold">days 🔥</span>
                                </div>
                            </div>

                            {/* Smooth SVG Wave instead of bars */}
                            <div className="absolute bottom-0 left-0 w-full h-[60%] overflow-hidden rounded-b-3xl opacity-80 z-10 pointer-events-none">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="streak-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                                            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,100 L0,60 C20,70 40,30 60,50 C80,70 90,40 100,20 L100,100 Z"
                                        fill="url(#streak-wave)"
                                    />
                                    <path
                                        d="M0,100 L0,60 C20,70 40,30 60,50 C80,70 90,40 100,20"
                                        stroke="#ec4899"
                                        strokeWidth="2"
                                        fill="none"
                                        className="drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                                    />
                                </svg>
                            </div>
                        </BentoCard>

                        {/* 3. QUICK ACTIONS WITH GLOW */}
                        <BentoCard className="flex flex-col min-h-[180px]">
                            <div className="flex flex-col justify-center h-full flex-1">
                                <h3 className="font-heading text-[16px] font-bold text-white mb-6 text-center drop-shadow-md">
                                    Quick Actions
                                </h3>
                                <div className="flex flex-col items-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full max-w-[200px] mx-auto py-2.5 rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] group-hover:opacity-90 transition-opacity" />
                                        <span className="relative z-10 text-[13px] font-bold tracking-wide text-white drop-shadow-md">
                                            + New Interview Room
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full max-w-[200px] mx-auto py-2.5 rounded-xl bg-white/5 text-white/80 border border-white/10 font-semibold text-[13px] hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-sm"
                                    >
                                        Join with Code
                                    </motion.button>
                                </div>
                            </div>
                        </BentoCard>

                        {/* 4. VISUAL STATS CARD */}
                        <BentoCard className="flex flex-col min-h-[160px]">
                            <div className="flex justify-between items-center h-full flex-1">
                                <div className="flex flex-col">
                                    <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider mb-2">
                                        Interviews Done
                                    </p>
                                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-heading leading-tight drop-shadow-md">
                                        12
                                    </span>
                                    <p className="text-emerald-400 text-[13px] mt-1 flex items-center gap-1 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full w-fit">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                        +3 this week
                                    </p>
                                </div>
                                {/* Circular Progress Graphic */}
                                <div className="relative w-24 h-24 mr-2">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                                        <motion.circle
                                            initial={{ strokeDasharray: "0 251.2" }}
                                            animate={{ strokeDasharray: "180 251.2" }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                            cx="50" cy="50" r="40"
                                            stroke="url(#progress-grad)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeLinecap="round"
                                            className="drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                                        />
                                        <defs>
                                            <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#00f2fe" />
                                                <stop offset="100%" stopColor="#4facfe" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white text-xl">🎯</span>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </motion.div>

                    {/* ── RIGHT COLUMN (col-span-8) ── */}
                    <motion.div
                        className="flex flex-col gap-6 md:gap-8 col-span-1 lg:col-span-8 xl:col-span-9 h-full w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* DSA PRACTICE (VIBRANT) */}
                        <BentoCard className="flex flex-col flex-1 p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading text-[19px] font-bold text-white drop-shadow-sm flex items-center gap-2">
                                    <span className="text-purple-400">⚡</span> Solo DSA Practice
                                </h3>
                                <button className="text-[13px] font-medium text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 mr-6 sm:mr-8">
                                    View All →
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2">
                                {PRACTICE_PROBLEMS.map((problem) => (
                                    <div
                                        key={problem.id}
                                        className="
                                            grid grid-cols-[minmax(140px,2fr)_80px_70px_1fr_40px_auto] gap-3 items-center
                                            bg-white/[0.04] rounded-[20px]
                                            px-5 py-3 sm:px-6 sm:py-3.5
                                            border border-white/5
                                            hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                                            transition-all duration-300
                                            group
                                        "
                                    >
                                        {/* TITLE & ICON */}
                                        <div className="flex items-center gap-3 truncate pr-2">
                                            <span className="text-[16px] drop-shadow-md bg-white/5 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 shrink-0">{problem.icon}</span>
                                            <span className="text-white/90 font-semibold text-[14px] truncate">
                                                {problem.title}
                                            </span>
                                        </div>

                                        {/* PILL: DIFFICULTY */}
                                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate px-2.5 py-1 rounded-full border text-center ${problem.diffClass}`}>
                                            {problem.difficulty}
                                        </span>

                                        {/* PILL: TOPIC */}
                                        <span className={`text-[11px] font-semibold truncate px-2.5 py-1 rounded-full border text-center hidden sm:block ${problem.tagClass}`}>
                                            {problem.tag}
                                        </span>

                                        {/* GLOWING PROGRESS BAR */}
                                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden hidden md:block w-full max-w-[170px] ml-4 shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${problem.progress}%` }}
                                                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                                                className={`h-full rounded-full bg-gradient-to-r ${problem.gradient} shadow-[0_0_10px_rgba(255,255,255,0.4)]`}
                                            />
                                        </div>

                                        {/* PERCENTAGE */}
                                        <span className="text-[12px] font-bold text-white/60 text-right hidden md:block tracking-wide">
                                            {problem.progress}%
                                        </span>

                                        {/* INLINE SOLVE BUTTON */}
                                        <div className="flex justify-end w-full pl-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="
                                                    bg-white/10 border border-white/20 text-white hover:bg-white text-[12px] font-bold hover:text-black
                                                    px-4 py-1.5 rounded-xl
                                                    opacity-0 group-hover:opacity-100
                                                    transition-all duration-300
                                                    shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                                                "
                                            >
                                                Solve
                                            </motion.button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* RECENT INTERVIEWS (VIBRANT) */}
                        <BentoCard className="flex flex-col flex-1 p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading text-[19px] font-bold text-white drop-shadow-sm flex items-center gap-2">
                                    <span className="text-cyan-400">📅</span> Recent Interviews
                                </h3>
                                <button className="text-[13px] font-medium text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 mr-6 sm:mr-8">
                                    See All →
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 pb-2">
                                {RECENT_INTERVIEWS.map((interview) => (
                                    <div
                                        key={interview.id}
                                        className="
                                            flex items-center justify-between
                                            bg-white/[0.04] rounded-[20px]
                                            px-5 py-4 sm:px-6 sm:py-4.5
                                            border border-white/5
                                            hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                                            transition-all duration-300
                                            group
                                        "
                                    >
                                        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                                            {/* Colorful 3D Avatar inside a gradient bubble */}
                                            <div className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full p-[2px] bg-gradient-to-br ${interview.avatarGradient} shadow-[0_4px_10px_rgba(0,0,0,0.3)] shrink-0`}>
                                                <div className="absolute inset-[2px] rounded-full bg-[#111827] overflow-hidden flex items-center justify-center">
                                                    <img
                                                        src={`https://api.dicebear.com/7.x/micah/svg?seed=${interview.seed}&backgroundColor=transparent`}
                                                        alt={interview.candidate}
                                                        className="w-full h-full object-cover scale-[1.15] translate-y-1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="min-w-0 truncate">
                                                <p className="text-white text-[14.5px] md:text-[15px] font-bold mb-0.5 truncate tracking-wide">
                                                    {interview.candidate}
                                                </p>
                                                <p className="text-white/50 text-[12px] md:text-[12.5px] font-medium truncate">
                                                    {interview.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5 text-right shrink-0">
                                            <div className="flex flex-col items-end gap-1.5">
                                                {/* PILL: STATUS WITH PULSING DOT */}
                                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${interview.statusClass}`}>
                                                    <span className="relative flex h-2 w-2">
                                                        {(interview.status === "Reviewing" || interview.status === "Cancelled") ? null : (
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
                                                        )}
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                                                    </span>
                                                    <span className="text-[11px] md:text-[11.5px] font-bold tracking-wide uppercase">{interview.status}</span>
                                                </div>
                                                <p className="text-[11px] md:text-[11.5px] text-white/40 font-medium mr-1">{interview.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
