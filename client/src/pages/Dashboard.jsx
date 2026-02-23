// =============================================
//  Dashboard.jsx — Bento Box Grid Dashboard
// =============================================
//
//  A "Bento Box" layout is a modern grid-based design
//  where cards span different column/row sizes, creating
//  an asymmetric mosaic that feels dynamic and premium.
//
//  Grid structure (on md+ screens):
//    ┌────────┬──────────────────┐
//    │ Stats  │  Practice        │  row 1 (250px)
//    │        │  Problems        │
//    ├────────┤──────────────────┤
//    │ Quick  │                  │
//    │ Actions│  Recent          │  row 2 (250px)
//    ├────────┤  Interviews      │
//    │ Profile│  (row-span-2)    │  row 3 (250px)
//    ├────────┤                  │
//    │ Streak │                  │
//    └────────┴──────────────────┘
//
//  Animation strategy:
//    • Container uses staggerChildren to cascade cards in
//    • Each card fades in from below with a slight delay
//    • Hover lifts the card up 8px + border glow
// =============================================

import { motion } from "framer-motion";

// ── Stagger container ─────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

// ── Individual card entrance ──────────────────
const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ── Reusable BentoCard wrapper ────────────────
// Every bento box uses this base component.
// It handles the base styling, hover animation,
// and entrance animation in one place.
const BentoCard = ({ children, className = "" }) => (
    <motion.div
        variants={cardVariants}
        // ── Float up + glow on hover ──
        whileHover={{
            y: -8,
            transition: { duration: 0.2 },
        }}
        className={`
      bg-surface rounded-3xl
      border border-white/10
      p-8
      relative overflow-hidden
      shadow-xl shadow-glass
      hover:border-white/30 hover:shadow-glow
      transition-[border-color,box-shadow] duration-300
      ${className}
    `}
    >
        {/* Subtle inner glow at the top edge */}
        <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden="true"
        />
        {children}
    </motion.div>
);

// ── Dummy data ────────────────────────────────
const PRACTICE_PROBLEMS = [
    { id: 1, title: "Two Sum", difficulty: "Easy", tag: "Arrays", color: "text-emerald-400" },
    { id: 2, title: "Valid Parentheses", difficulty: "Medium", tag: "Stacks", color: "text-yellow-400" },
    { id: 3, title: "Merge Intervals", difficulty: "Medium", tag: "Sorting", color: "text-yellow-400" },
];

const RECENT_INTERVIEWS = [
    { id: 1, candidate: "Alex Johnson", role: "Frontend Engineer", date: "Feb 22", status: "Completed", statusColor: "bg-emerald-400" },
    { id: 2, candidate: "Maria Garcia", role: "Full Stack Dev", date: "Feb 21", status: "Pending Review", statusColor: "bg-yellow-400" },
    { id: 3, candidate: "Sam Williams", role: "Backend Engineer", date: "Feb 20", status: "Completed", statusColor: "bg-emerald-400" },
    { id: 4, candidate: "Priya Patel", role: "DevOps Engineer", date: "Feb 19", status: "Cancelled", statusColor: "bg-red-400" },
    { id: 5, candidate: "Jordan Lee", role: "ML Engineer", date: "Feb 18", status: "Completed", statusColor: "bg-emerald-400" },
];

const Dashboard = () => {
    return (
        <section className="max-w-7xl mx-auto pt-32 pb-16 px-8">
            {/* ── Page Header ─────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <span className="section-badge mb-4 inline-block">Dashboard</span>
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Welcome back 👋
                </h1>
                <p className="text-muted text-lg mt-2">
                    Here's an overview of your interview activity.
                </p>
            </motion.div>

            {/* ── Bento Grid ──────────────────────── */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* ╔═══════════════════════════════════╗
         *  1. STATS CARD — Total Interviews
         *  Spans: 1 col × 1 row
         * ╚═══════════════════════════════════╝ */}
                <BentoCard>
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <p className="text-muted text-sm font-medium uppercase tracking-wider">
                                Total Interviews
                            </p>
                        </div>
                        <div>
                            <span className="text-5xl font-bold text-white font-heading">
                                247
                            </span>
                            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                +12% this month
                            </p>
                        </div>
                    </div>
                </BentoCard>

                {/* ╔═══════════════════════════════════╗
         *  2. PRACTICE PROBLEMS
         *  Spans: 2 cols × 1 row
         * ╚═══════════════════════════════════╝ */}
                <BentoCard className="md:col-span-2">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-heading text-lg font-semibold text-white">
                                Practice Problems
                            </h3>
                            <span className="text-xs text-muted cursor-pointer hover:text-white transition-colors">
                                View All →
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            {PRACTICE_PROBLEMS.map((problem) => (
                                <div
                                    key={problem.id}
                                    className="
                    flex items-center justify-between
                    bg-white/[0.03] rounded-xl
                    px-5 py-3
                    border border-white/5
                    hover:border-white/10 hover:bg-white/[0.05]
                    transition-all duration-200
                    group
                  "
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-medium text-sm">
                                            {problem.title}
                                        </span>
                                        <span className={`text-xs font-medium ${problem.color}`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="text-xs text-muted/60 hidden sm:inline">
                                            {problem.tag}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="
                      bg-white text-black text-xs font-medium
                      rounded-full px-4 py-1.5
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      cursor-pointer
                    "
                                    >
                                        Solve
                                    </motion.button>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                {/* ╔═══════════════════════════════════╗
         *  3. QUICK ACTIONS
         *  Spans: 1 col × 1 row
         * ╚═══════════════════════════════════╝ */}
                <BentoCard>
                    <div className="flex flex-col justify-between h-full">
                        <h3 className="font-heading text-lg font-semibold text-white mb-4">
                            Quick Actions
                        </h3>
                        <div className="flex flex-col gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="
                  w-full py-3 rounded-xl
                  bg-white text-black
                  font-medium text-sm
                  cursor-pointer
                  hover:shadow-glow-sm
                  transition-shadow duration-200
                "
                            >
                                + New Interview Room
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="
                  w-full py-3 rounded-xl
                  bg-white/5 text-white
                  border border-white/10
                  font-medium text-sm
                  cursor-pointer
                  hover:bg-white/10 hover:border-white/20
                  transition-all duration-200
                "
                            >
                                Join with Code
                            </motion.button>
                        </div>
                    </div>
                </BentoCard>

                {/* ╔═══════════════════════════════════╗
         *  4. RECENT INTERVIEWS
         *  Spans: 2 cols × 2 rows
         *  A scrollable list with dividers.
         * ╚═══════════════════════════════════╝ */}
                <BentoCard className="md:col-span-2 md:row-span-2">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-heading text-lg font-semibold text-white">
                                Recent Interviews
                            </h3>
                            <span className="text-xs text-muted cursor-pointer hover:text-white transition-colors">
                                See All →
                            </span>
                        </div>
                        <div className="flex flex-col flex-1 overflow-y-auto pr-1">
                            {RECENT_INTERVIEWS.map((interview, index) => (
                                <div
                                    key={interview.id}
                                    className={`
                    flex items-center justify-between
                    py-4 px-2
                    hover:bg-white/[0.02] rounded-lg
                    transition-colors duration-200
                    ${index < RECENT_INTERVIEWS.length - 1 ? "border-b border-white/5" : ""}
                  `}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar placeholder */}
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                                            {interview.candidate.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">
                                                {interview.candidate}
                                            </p>
                                            <p className="text-muted text-xs mt-0.5">
                                                {interview.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-right">
                                        <div>
                                            <div className="flex items-center gap-2 justify-end">
                                                <span className={`w-1.5 h-1.5 rounded-full ${interview.statusColor}`} />
                                                <span className="text-xs text-muted">{interview.status}</span>
                                            </div>
                                            <p className="text-xs text-muted/50 mt-0.5">{interview.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                {/* ╔═══════════════════════════════════╗
         *  5. PROFILE CARD
         *  Spans: 1 col × 1 row
         * ╚═══════════════════════════════════╝ */}
                <BentoCard>
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">
                            👤
                        </div>
                        <h3 className="font-heading text-white font-semibold">Your Profile</h3>
                        <p className="text-muted text-xs mt-1 mb-4">Senior Engineer</p>
                        <button className="text-xs text-muted hover:text-white border border-white/10 rounded-full px-4 py-1.5 hover:border-white/20 transition-all duration-200 cursor-pointer">
                            Edit Profile
                        </button>
                    </div>
                </BentoCard>

                {/* ╔═══════════════════════════════════╗
         *  6. STREAK / ACTIVITY CARD
         *  Spans: 1 col × 1 row
         * ╚═══════════════════════════════════╝ */}
                <BentoCard>
                    <div className="flex flex-col justify-between h-full">
                        <p className="text-muted text-sm font-medium uppercase tracking-wider">
                            Current Streak
                        </p>
                        <div>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-bold text-white font-heading">14</span>
                                <span className="text-muted text-sm mb-2">days 🔥</span>
                            </div>
                            {/* Mini bar chart (decorative) */}
                            <div className="flex items-end gap-1 mt-4 h-8">
                                {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-sm bg-white/10 hover:bg-white/20 transition-colors duration-200"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </BentoCard>
            </motion.div>
        </section>
    );
};

export default Dashboard;
