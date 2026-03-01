"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    User, Mail, Briefcase, GraduationCap, Star, Trophy, TrendingUp, Clock,
    Edit3, Save, BookOpen, CheckCircle2, Target, Flame, Award, Zap, Camera, Plus, Trash2
} from "lucide-react";

const mockSkills = [
    { name: "Python", level: 85, status: "Mastered", category: "Programming" },
    { name: "JavaScript", level: 78, status: "Advanced", category: "Programming" },
    { name: "React", level: 72, status: "Advanced", category: "Frontend" },
    { name: "SQL", level: 65, status: "Intermediate", category: "Database" },
    { name: "Git", level: 90, status: "Mastered", category: "Tools" },
    { name: "Docker", level: 40, status: "Learning", category: "DevOps" },
    { name: "Machine Learning", level: 30, status: "Learning", category: "AI/Data" },
    { name: "AWS", level: 25, status: "Beginner", category: "Cloud" },
];

const achievements = [
    { icon: "🎯", title: "First Prediction", desc: "Generated your first skill prediction", earned: true },
    { icon: "🔥", title: "5-Day Streak", desc: "Logged in 5 consecutive days", earned: true },
    { icon: "📚", title: "Knowledge Seeker", desc: "Explored 10+ learning resources", earned: true },
    { icon: "🚀", title: "Path Finder", desc: "Saved your first career pathway", earned: false },
    { icon: "💎", title: "Skill Master", desc: "Mastered 5 skills", earned: false },
    { icon: "🏆", title: "Top 10%", desc: "Ranked in the top 10% of learners", earned: false },
];

const recentActivity = [
    { action: "Completed Python Masterclass", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-500" },
    { action: "Generated prediction: ML Engineer", time: "1 day ago", icon: Zap, color: "text-brand-500" },
    { action: "Started learning Docker", time: "3 days ago", icon: BookOpen, color: "text-violet-500" },
    { action: "Updated skill confidence: React 72%", time: "5 days ago", icon: TrendingUp, color: "text-amber-500" },
];

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("Deepak");
    const [email] = useState("deepak@transkill.ai");
    const [bio, setBio] = useState("Aspiring Full Stack Developer transitioning into Data Science & ML");
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [experiences, setExperiences] = useState([
        { role: "Frontend Developer", company: "Tech Solutions Inc.", year: "2023 - Present" }
    ]);
    const [newExp, setNewExp] = useState({ role: "", company: "", year: "" });
    const [addingExp, setAddingExp] = useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setAvatarSrc(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const addExperience = () => {
        if (newExp.role && newExp.company) {
            setExperiences([...experiences, newExp]);
            setNewExp({ role: "", company: "", year: "" });
            setAddingExp(false);
        }
    };

    const statusColor = (status: string) => {
        if (status === "Mastered") return "bg-emerald-100 text-emerald-700 border-emerald-200";
        if (status === "Advanced") return "bg-brand-100 text-brand-700 border-brand-200";
        if (status === "Intermediate") return "bg-amber-100 text-amber-700 border-amber-200";
        if (status === "Learning") return "bg-violet-100 text-violet-700 border-violet-200";
        return "bg-slate-100 text-slate-500 border-slate-200";
    };

    const levelColor = (level: number) => {
        if (level >= 80) return "from-emerald-400 to-emerald-600";
        if (level >= 60) return "from-brand-400 to-brand-600";
        if (level >= 40) return "from-amber-400 to-amber-600";
        return "from-violet-400 to-violet-600";
    };

    return (
        <div className="min-h-screen bg-section-profile bg-dots p-6 md:p-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* Profile Header Card */}
                <div className="glass-panel p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-100/40 to-transparent rounded-bl-full" />
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div
                            className="w-24 h-24 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-4xl font-black text-white shadow-xl relative group cursor-pointer overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {avatarSrc ? (
                                <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                name[0]
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <div className="space-y-3">
                                    <input value={name} onChange={e => setName(e.target.value)} className="text-2xl font-black text-slate-900 bg-transparent border-b-2 border-brand-300 outline-none pb-1 w-full" />
                                    <textarea value={bio} onChange={e => setBio(e.target.value)} className="text-sm text-slate-500 bg-transparent border-b border-slate-200 outline-none w-full resize-none" rows={2} />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-black text-slate-900">{name}</h1>
                                    <p className="text-slate-500 mt-1">{bio}</p>
                                </>
                            )}
                            <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {email}</span>
                                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> Full Stack Developer</span>
                                <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> Self-Taught</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setEditing(!editing)}
                            className="px-5 py-2.5 rounded-full border-2 border-brand-200 text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors flex items-center gap-2"
                        >
                            {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Skills Portfolio */}
                    <div className="lg:col-span-2 glass-panel p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Star className="w-5 h-5 text-brand-500" />
                            Skills Portfolio
                        </h2>
                        <div className="space-y-4">
                            {mockSkills.map((skill, i) => (
                                <Link
                                    key={skill.name}
                                    href={`/profile/activity/${encodeURIComponent(skill.name)}`}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="w-32 text-sm font-semibold text-slate-700 group-hover:text-brand-600 shrink-0 transition-colors">{skill.name}</div>
                                        <div className="flex-1">
                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${levelColor(skill.level)}`}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-600 w-10 text-right">{skill.level}%</span>
                                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full border ${statusColor(skill.status)} shrink-0`}>
                                            {skill.status}
                                        </span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        {/* Achievements */}
                        <div className="glass-panel p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Achievements
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {achievements.map((a, i) => (
                                    <div key={i} className={`p-3 rounded-xl border text-center transition-all ${a.earned ? 'bg-white border-amber-100 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-40 grayscale'}`}>
                                        <div className="text-2xl mb-1">{a.icon}</div>
                                        <p className="text-xs font-bold text-slate-800">{a.title}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{a.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Work Experience */}
                        <div className="glass-panel p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-brand-500" />
                                    Work Experience
                                </h2>
                                <button onClick={() => setAddingExp(!addingExp)} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="flex justify-between items-start border-l-2 border-brand-200 pl-4 py-1">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm">{exp.role}</h3>
                                            <p className="text-xs text-slate-500">{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{exp.year}</span>
                                    </div>
                                ))}

                                {addingExp && (
                                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                                        <input placeholder="Role (e.g. Frontend Dev)" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} className="w-full text-sm p-2 rounded border border-slate-200" />
                                        <input placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} className="w-full text-sm p-2 rounded border border-slate-200" />
                                        <input placeholder="Duration (e.g. 2021 - 2023)" value={newExp.year} onChange={e => setNewExp({ ...newExp, year: e.target.value })} className="w-full text-sm p-2 rounded border border-slate-200" />
                                        <div className="flex gap-2">
                                            <button onClick={addExperience} className="flex-1 bg-brand-600 text-white text-xs font-bold py-2 rounded shadow-sm hover:bg-brand-700">Add</button>
                                            <button onClick={() => setAddingExp(false)} className="px-3 bg-slate-200 text-slate-600 text-xs font-bold py-2 rounded hover:bg-slate-300">Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="glass-panel p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-500" />
                                Recent Activity
                            </h2>
                            <div className="space-y-3">
                                {recentActivity.map((item, i) => (
                                    <Link key={i} href={item.action.includes("Python") ? "/profile/activity/Python" : item.action.includes("Docker") ? "/profile/activity/Docker" : item.action.includes("React") ? "/profile/activity/React" : "/roadmap"} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-brand-200 transition-colors shadow-sm cursor-pointer group">
                                        <item.icon className={`w-4 h-4 mt-0.5 ${item.color} shrink-0 group-hover:scale-110 transition-transform`} />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">{item.action}</p>
                                            <p className="text-xs text-slate-400">{item.time}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
