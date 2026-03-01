"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, PlayCircle, Code, Award, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuggestedPathwayPage({ params }: { params: Promise<{ skill: string }> }) {
    const { skill: encodedSkill } = use(params);
    const skill = decodeURIComponent(encodedSkill);

    const [completedModules, setCompletedModules] = useState<number[]>([]);
    const [expandedModule, setExpandedModule] = useState<number | null>(null);

    const toggleModule = (index: number) => {
        setCompletedModules(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const modules = [
        { title: `${skill} Fundamentals`, type: 'video', duration: '2h 30m', desc: `Core concepts and syntax for ${skill}.`, content: 'Watch the introductory lectures covering the basic building blocks and primitive data types.' },
        { title: `Setting up your environment`, type: 'practical', duration: '1h 00m', desc: `Tools, IDE configuration, and best practices.`, content: 'Install the required runtimes, configure your IDE extensions, and set up your first Hello World project.' },
        { title: `Advanced Patterns in ${skill}`, type: 'video', duration: '4h 15m', desc: `Deep dive into advanced architectural patterns.`, content: 'Explore enterprise-level patterns, state management, and lifecycle hooks crucial for production code.' },
        { title: `Building your first project`, type: 'project', duration: '8h 00m', desc: `Real-world application using everything learned so far.`, content: 'Follow along to build a fully functional CRUD application with data persistence.' },
        { title: `Testing and Deployment`, type: 'practical', duration: '3h 45m', desc: `CI/CD pipelines and unit testing strategies.`, content: 'Write unit tests using Jest, and configure GitHub Actions for automated deployment.' },
    ];

    const progressPercentage = Math.round((completedModules.length / modules.length) * 100) || 0;

    return (
        <div className="min-h-screen bg-section-dashboard bg-dots p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Learning Path: {skill}</h1>
                        <p className="text-slate-500 font-medium mt-1">Curated resources optimized for your background</p>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Time</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-slate-800">
                            <Clock className="w-6 h-6 text-brand-500" />
                            45 Hours
                        </div>
                    </div>
                    <div className="glass-card p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Modules</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-slate-800">
                            <BookOpen className="w-6 h-6 text-emerald-500" />
                            8 Modules
                        </div>
                    </div>
                    <div className="glass-card p-5 border-brand-200 bg-brand-50/50">
                        <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-1">Your Progress</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-brand-900">
                            <Award className="w-6 h-6 text-brand-500" />
                            {progressPercentage}%
                        </div>
                    </div>
                </div>

                {/* Path Content */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Course Curriculum</h2>

                    {modules.map((mod, i) => {
                        const isCompleted = completedModules.includes(i);
                        const isExpanded = expandedModule === i;

                        return (
                            <div key={i} className={`glass-panel p-6 hover:border-brand-300 transition-all cursor-pointer group ${isCompleted ? 'border-emerald-200 bg-emerald-50/30' : ''}`} onClick={() => setExpandedModule(isExpanded ? null : i)}>
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${isCompleted ? 'bg-emerald-500 text-white' : mod.type === 'video' ? 'bg-blue-100 text-blue-600' :
                                        mod.type === 'practical' ? 'bg-amber-100 text-amber-600' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                                            mod.type === 'video' ? <PlayCircle className="w-6 h-6" /> :
                                                mod.type === 'practical' ? <Code className="w-6 h-6" /> :
                                                    <Award className="w-6 h-6" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`text-lg font-bold transition-colors ${isCompleted ? 'text-emerald-800' : 'text-slate-800 group-hover:text-brand-600'}`}>Module {i + 1}: {mod.title}</h3>
                                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{mod.duration}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{mod.desc}</p>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="mt-4 pt-4 border-t border-slate-100 overflow-hidden"
                                                >
                                                    <p className="text-sm text-slate-700 leading-relaxed max-w-2xl mb-4">{mod.content}</p>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); toggleModule(i); }}
                                                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${isCompleted ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'}`}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleModule(i); }}
                                        className={`w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110 ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 text-slate-300 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50'}`}>
                                        <CheckCircle2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
