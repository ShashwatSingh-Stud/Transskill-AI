"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Map, CheckCircle2, Circle, Clock, Trophy, BookOpen, TrendingUp,
    ChevronRight, Zap, Star, Target, ArrowRight, Flame
} from "lucide-react";

const roadmapPhases = [
    {
        phase: "Foundation",
        duration: "Weeks 1-3",
        status: "completed",
        color: "from-emerald-500 to-teal-500",
        skills: [
            { name: "Python Fundamentals", status: "completed", hours: 20 },
            { name: "Git Version Control", status: "completed", hours: 8 },
            { name: "SQL Basics", status: "completed", hours: 15 },
        ]
    },
    {
        phase: "Core Development",
        duration: "Weeks 4-8",
        status: "in-progress",
        color: "from-brand-500 to-brand-700",
        skills: [
            { name: "React & Next.js", status: "in-progress", hours: 35 },
            { name: "Node.js Backend", status: "in-progress", hours: 20 },
            { name: "REST API Design", status: "not-started", hours: 0 },
        ]
    },
    {
        phase: "Specialization",
        duration: "Weeks 9-12",
        status: "not-started",
        color: "from-violet-500 to-purple-600",
        skills: [
            { name: "Machine Learning Basics", status: "not-started", hours: 0 },
            { name: "Data Analysis with Pandas", status: "not-started", hours: 0 },
            { name: "Cloud Deployment (AWS)", status: "not-started", hours: 0 },
        ]
    },
    {
        phase: "Mastery & Portfolio",
        duration: "Weeks 13-16",
        status: "not-started",
        color: "from-amber-500 to-orange-500",
        skills: [
            { name: "Build Capstone Project", status: "not-started", hours: 0 },
            { name: "Technical Interview Prep", status: "not-started", hours: 0 },
            { name: "Portfolio & Resume Polish", status: "not-started", hours: 0 },
        ]
    }
];

const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "in-progress") return <Clock className="w-5 h-5 text-brand-500 animate-pulse" />;
    return <Circle className="w-5 h-5 text-slate-300" />;
};

const statusBadge = (status: string) => {
    if (status === "completed") return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Done</span>;
    if (status === "in-progress") return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-50 text-brand-700 rounded-full border border-brand-100">Active</span>;
    return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-slate-50 text-slate-400 rounded-full border border-slate-100">Upcoming</span>;
};

export default function RoadmapPage() {
    const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
    const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "in-progress">("all");

    const totalSkills = roadmapPhases.reduce((a, p) => a + p.skills.length, 0);
    const completedSkills = roadmapPhases.reduce((a, p) => a + p.skills.filter(s => s.status === "completed").length, 0);
    const inProgressSkills = roadmapPhases.reduce((a, p) => a + p.skills.filter(s => s.status === "in-progress").length, 0);
    const totalHours = roadmapPhases.reduce((a, p) => a + p.skills.reduce((b, s) => b + s.hours, 0), 0);

    return (
        <div className="min-h-screen bg-section-roadmap bg-dots p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center shadow-lg">
                            <Map className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900">My Learning Roadmap</h1>
                    </div>
                    <p className="text-slate-500 ml-13">Your personalized 16-week career transition pathway</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Total Skills", value: totalSkills, icon: Target, color: "text-brand-600", bg: "bg-brand-50 border-brand-100", filter: "all" },
                        { label: "Completed", value: completedSkills, icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", filter: "completed" },
                        { label: "In Progress", value: inProgressSkills, icon: Flame, color: "text-amber-600", bg: "bg-amber-50 border-amber-100", filter: "in-progress" },
                        { label: "Hours Logged", value: totalHours, icon: Clock, color: "text-violet-600", bg: "bg-violet-50 border-violet-100", filter: "all" },
                    ].map((stat, i) => (
                        <motion.button
                            key={stat.label}
                            onClick={() => setActiveFilter(stat.filter as any)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-5 border text-left flex flex-col justify-between h-full transition-all ${activeFilter === stat.filter ? `ring-2 ring-offset-2 ${stat.bg.replace('bg-', 'ring-').split(' ')[0]}` : ''
                                } ${stat.bg} hover:shadow-md cursor-pointer`}
                        >
                            <div className="flex w-full items-center justify-between mb-3">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
                            </div>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        </motion.button>
                    ))}
                </div>

                {/* Overall Progress */}
                <div className="glass-panel p-6 mb-10">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-800">Overall Progress</h3>
                        <span className="text-sm font-black text-brand-600">{Math.round((completedSkills / totalSkills) * 100)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedSkills / totalSkills) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                        />
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {roadmapPhases.map((phase, phaseIdx) => {
                        const visibleSkills = phase.skills.filter(s => activeFilter === "all" || s.status === activeFilter);
                        if (visibleSkills.length === 0 && activeFilter !== "all") return null;

                        return (
                            <motion.div
                                key={phaseIdx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: phaseIdx * 0.15 }}
                                className="glass-panel overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedPhase(expandedPhase === phaseIdx ? null : phaseIdx)}
                                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${phase.color} flex items-center justify-center shadow-lg`}>
                                            <span className="text-white font-black text-lg">{phaseIdx + 1}</span>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-bold text-slate-900">{phase.phase}</h3>
                                            <p className="text-sm text-slate-500">{phase.duration} • {visibleSkills.length} skills</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {statusBadge(phase.status)}
                                        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedPhase === phaseIdx || activeFilter !== "all" ? 'rotate-90' : ''}`} />
                                    </div>
                                </button>

                                {(expandedPhase === phaseIdx || activeFilter !== "all") && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className="px-6 pb-6 space-y-3"
                                    >
                                        {visibleSkills.map((skill, skillIdx) => (
                                            <Link href={`/path/${encodeURIComponent(skill.name)}`} key={skillIdx} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    {statusIcon(skill.status)}
                                                    <div>
                                                        <p className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">{skill.name}</p>
                                                        {skill.hours > 0 && <p className="text-xs text-slate-400">{skill.hours} hours invested</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {statusBadge(skill.status)}
                                                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-brand-500 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
