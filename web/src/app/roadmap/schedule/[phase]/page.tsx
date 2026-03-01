"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckSquare, Trophy, Target, BookOpen, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhaseSchedulePage({ params }: { params: Promise<{ phase: string }> }) {
    const { phase: encodedPhase } = use(params);
    const phase = decodeURIComponent(encodedPhase);
    const phaseNum = phase.replace(/\D/g, '') || '1';

    const [completedDays, setCompletedDays] = useState<number[]>([]);
    const [activeResourceDay, setActiveResourceDay] = useState<number | null>(null);

    const toggleDay = (day: number) => {
        setCompletedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="min-h-screen bg-section-roadmap bg-dots p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Phase {phaseNum} Schedule</h1>
                        <p className="text-slate-500 font-medium mt-1">Your detailed day-by-day action plan</p>
                    </div>
                </div>

                {/* Weeks */}
                <div className="space-y-8">
                    {[1, 2, 3, 4].map((week) => (
                        <div key={week} className="glass-panel p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-brand-500" />
                                Week {week + (parseInt(phaseNum) - 1) * 4}
                            </h2>

                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((day) => {
                                    const absDay = day + (week - 1) * 5;
                                    const isCompleted = completedDays.includes(absDay);
                                    const showResources = activeResourceDay === absDay;

                                    return (
                                        <div key={day} className={`flex gap-4 p-4 rounded-2xl border transition-all group ${isCompleted ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-slate-100 hover:border-brand-200'}`}>
                                            <div className={`w-16 flex flex-col items-center justify-center border-r pr-4 ${isCompleted ? 'border-emerald-100' : 'border-slate-100'}`}>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-emerald-500' : 'text-slate-400'}`}>Day</span>
                                                <span className={`text-xl font-black ${isCompleted ? 'text-emerald-700' : 'text-slate-800'}`}>{absDay}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className={`font-bold ${isCompleted ? 'text-emerald-900 line-through opacity-70' : 'text-slate-900'}`}>Deep Work Session ({week === 4 && day === 5 ? 'Project Build' : 'Fundamentals'})</h4>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'text-accent-700 bg-accent-50'}`}>2 Hours</span>
                                                </div>
                                                <p className={`text-sm mt-1 ${isCompleted ? 'text-emerald-600/70 line-through' : 'text-slate-600'}`}>Complete module {absDay} exercises and update github repository with today&apos;s learnings.</p>

                                                <AnimatePresence>
                                                    {showResources && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                                                        >
                                                            <div className="flex justify-between items-center mb-3">
                                                                <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2"><BookOpen className="w-4 h-4" /> Suggested Reading</h5>
                                                                <button onClick={() => setActiveResourceDay(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                                            </div>
                                                            <ul className="space-y-2 text-sm text-slate-600">
                                                                <li><a href="#" className="flex items-center gap-1 hover:text-brand-600 transition-colors">Official Documentation <ExternalLink className="w-3 h-3" /></a></li>
                                                                <li><a href="#" className="flex items-center gap-1 hover:text-brand-600 transition-colors">Medium Article on Syntax <ExternalLink className="w-3 h-3" /></a></li>
                                                                <li><a href="#" className="flex items-center gap-1 hover:text-brand-600 transition-colors">Practice Repository Template <ExternalLink className="w-3 h-3" /></a></li>
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        onClick={() => toggleDay(absDay)}
                                                        className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl border text-xs font-bold transition-all ${isCompleted ? 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200'}`}>
                                                        <CheckSquare className="w-4 h-4" /> {isCompleted ? 'Completed' : 'Mark Complete'}
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveResourceDay(showResources ? null : absDay)}
                                                        className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl border text-xs font-bold transition-all ${showResources ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200'}`}>
                                                        <Target className="w-4 h-4" /> {showResources ? 'Close Resources' : 'View Resources'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass-card p-8 text-center bg-gradient-to-br from-brand-900 to-indigo-900 text-white rounded-3xl">
                    <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-black mb-2">Phase {phaseNum} Goal</h2>
                    <p className="text-brand-200 mb-6">Complete all 20 daily sessions to unlock the next phase certification.</p>
                    <button
                        onClick={() => {
                            if (completedDays.length === 20) {
                                alert("Assessment unlocked! Redirecting to Phase Certification...");
                            } else {
                                alert(`You still have ${20 - completedDays.length} sessions left to complete before you can take the assessment.`);
                            }
                        }}
                        className="px-8 py-3 bg-white text-brand-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">
                        View Phase Assessment
                    </button>
                </div>

            </div>
        </div>
    );
}
