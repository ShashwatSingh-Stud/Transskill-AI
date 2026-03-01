"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Compass, ArrowRight, TrendingUp, DollarSign, Clock, BookOpen, Briefcase, Zap, ChevronDown, BarChart3, Target, Sparkles, CheckCircle2, AlertTriangle, PlayCircle, Trophy
} from "lucide-react";

const roles = [
    { title: "Frontend Developer", avgSalary: 95000, growth: "+12%", demand: "High" },
    { title: "Backend Developer", avgSalary: 105000, growth: "+10%", demand: "High" },
    { title: "Full Stack Developer", avgSalary: 115000, growth: "+15%", demand: "Very High" },
    { title: "Data Scientist", avgSalary: 130000, growth: "+22%", demand: "Very High" },
    { title: "ML Engineer", avgSalary: 145000, growth: "+28%", demand: "Exceptional" },
    { title: "DevOps Engineer", avgSalary: 120000, growth: "+18%", demand: "High" },
    { title: "Cloud Architect", avgSalary: 155000, growth: "+25%", demand: "Very High" },
];

const scenarios = [
    {
        week: 1,
        title: "The First Challenge",
        description: "Your team is adopting a new architectural pattern that heavily relies on your target role's core skills. You need to get up to speed fast.",
        choices: [
            { text: "Spend the weekend taking a deep-dive crash course.", timeImpact: -2, salaryImpact: 5000, feedback: "Great dedication! You grasped the concepts quickly, saving time in the long run." },
            { text: "Read the official documentation during work hours.", timeImpact: 1, salaryImpact: 1000, feedback: "A safe bet. You learned the basics but it slowed down your current project delivery slightly." },
            { text: "Ask a senior engineer to pair program with you.", timeImpact: -1, salaryImpact: 3000, feedback: "Excellent collaboration. You learned best practices and strengthened team bonds." }
        ]
    },
    {
        week: 4,
        title: "The Project Crisis",
        description: "A critical bug has appeared in production. Fixing it requires the exact skills you are learning for your transition.",
        choices: [
            { text: "Volunteer to lead the fixing effort.", timeImpact: -3, salaryImpact: 8000, feedback: "High risk, high reward! You fixed it and proved you are ready for the new role." },
            { text: "Offer to assist the senior developer on the fix.", timeImpact: -1, salaryImpact: 2000, feedback: "A measured approach. You gained valuable hands-on experience without taking all the heat." },
            { text: "Focus on your normal tasks; it's too risky.", timeImpact: 2, salaryImpact: 0, feedback: "You played it safe, but missed a golden opportunity to prove your new skills." }
        ]
    },
    {
        week: 8,
        title: "The Internal Posting",
        description: "A junior position for your target role just opened up internally.",
        choices: [
            { text: "Apply immediately and pitch your transition progress.", timeImpact: -4, salaryImpact: 12000, feedback: "Bold move! Management loved your proactive approach and fast-tracked your transition." },
            { text: "Talk to the hiring manager to express future interest.", timeImpact: -1, salaryImpact: 4000, feedback: "Smart networking. You are now officially on their radar for the next opening." },
            { text: "Wait until you feel 100% ready.", timeImpact: 3, salaryImpact: 0, feedback: "Perfectionism delayed your progress. The role was filled externally." }
        ]
    }
];

export default function SimulatorPage() {
    const [fromRole, setFromRole] = useState("");
    const [toRole, setToRole] = useState("");
    const [status, setStatus] = useState<"configuring" | "playing" | "completed">("configuring");

    // Game State
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [stats, setStats] = useState({ weeksSaved: 0, bonusSalary: 0 });
    const [history, setHistory] = useState<{ scenario: any, choice: any }[]>([]);

    const fromRoleData = roles.find(r => r.title === fromRole);
    const toRoleData = roles.find(r => r.title === toRole);

    const handleStart = () => {
        if (fromRole && toRole && fromRole !== toRole) {
            setStatus("playing");
            setCurrentScenarioIndex(0);
            setStats({ weeksSaved: 0, bonusSalary: 0 });
            setHistory([]);
        }
    };

    const handleChoice = (choice: any) => {
        const scenario = scenarios[currentScenarioIndex];
        setHistory([...history, { scenario, choice }]);
        setStats(prev => ({
            weeksSaved: prev.weeksSaved + choice.timeImpact,
            bonusSalary: prev.bonusSalary + choice.salaryImpact
        }));

        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
        } else {
            setStatus("completed");
        }
    };

    const reset = () => setStatus("configuring");

    return (
        <div className="min-h-screen bg-section-simulator bg-dots p-6 md:p-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900">Career Simulator</h1>
                    </div>
                    <p className="text-slate-500 ml-13">Make critical career choices and visualize their impact on your transition</p>
                </div>

                {status === "configuring" && (
                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-brand-500" />
                            Build Your Scenario
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-slate-600 mb-2 block">Current Role</label>
                                <select
                                    value={fromRole}
                                    onChange={e => setFromRole(e.target.value)}
                                    className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white font-bold text-slate-800 focus:border-brand-500 outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select current role...</option>
                                    {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center shadow-lg">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-bold text-slate-600 mb-2 block">Target Role</label>
                                <select
                                    value={toRole}
                                    onChange={e => setToRole(e.target.value)}
                                    className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white font-bold text-slate-800 focus:border-accent-500 outline-none transition-colors cursor-pointer"
                                >
                                    <option value="">Select target role...</option>
                                    {roles.filter(r => r.title !== fromRole).map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleStart}
                            disabled={!fromRole || !toRole || fromRole === toRole}
                            className="mt-8 w-full px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block relative group overflow-hidden disabled:opacity-50 disabled:hover:transform-none"
                        >
                            <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center justify-center gap-3">
                                <PlayCircle className="w-6 h-6" /> Start Interactive Simulation
                            </span>
                        </button>
                    </div>
                )}

                {status === "playing" && fromRoleData && toRoleData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScenarioIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass-panel p-8"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">W{scenarios[currentScenarioIndex].week}</div>
                                        <h2 className="text-2xl font-black text-slate-800">{scenarios[currentScenarioIndex].title}</h2>
                                    </div>
                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        {scenarios[currentScenarioIndex].description}
                                    </p>
                                    <div className="space-y-4">
                                        {scenarios[currentScenarioIndex].choices.map((choice, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleChoice(choice)}
                                                className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 transition-all group font-medium text-slate-700 shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-brand-500 flex items-center justify-center mt-0.5 shrink-0">
                                                        <div className="w-3 h-3 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span>{choice.text}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="space-y-6">
                            <div className="glass-panel p-6 bg-slate-900 border-none">
                                <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs opacity-70">Current Trajectory</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md">
                                        <p className="text-brand-300 text-xs font-bold uppercase mb-1">Base Salary Path</p>
                                        <p className="text-2xl font-black text-white">
                                            ${fromRoleData.avgSalary.toLocaleString()}
                                            <ArrowRight className="inline w-4 h-4 mx-2 text-white/50" />
                                            <span className="text-emerald-400">${toRoleData.avgSalary.toLocaleString()}</span>
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md">
                                        <p className="text-brand-300 text-xs font-bold uppercase mb-1">Impact of Choices</p>
                                        <p className={`text-xl font-bold ${stats.bonusSalary >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {stats.bonusSalary >= 0 ? '+' : ''}${stats.bonusSalary.toLocaleString()} / year
                                        </p>
                                        <p className={`text-xl font-bold mt-1 ${stats.weeksSaved <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {stats.weeksSaved <= 0 ? '-' : '+'}{Math.abs(stats.weeksSaved)} weeks on timeline
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {history.length > 0 && (
                                <div className="glass-panel p-6">
                                    <h3 className="font-bold text-slate-800 mb-4">Journey Log</h3>
                                    <div className="space-y-4">
                                        {history.map((h, i) => (
                                            <div key={i} className="pl-4 border-l-2 border-brand-200">
                                                <p className="text-xs font-bold text-brand-600 mb-1">Week {h.scenario.week}</p>
                                                <p className="text-sm text-slate-700 font-medium">{h.choice.text}</p>
                                                <p className="text-xs text-slate-500 mt-1 italic">&quot;{h.choice.feedback}&quot;</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {status === "completed" && fromRoleData && toRoleData && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-6">
                        <div className="glass-panel text-center overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-indigo-900 to-purple-900" />
                            <div className="relative p-12">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
                                    <Trophy className="w-10 h-10 text-amber-400" />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4">Simulation Complete!</h2>
                                <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">You successfully navigated the transition from {fromRole} to {toRole}. Your strategic choices directly influenced your trajectory.</p>

                                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
                                    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <div className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-2">Final Salary Boost</div>
                                        <div className="text-3xl font-black text-emerald-400">+${(toRoleData.avgSalary - fromRoleData.avgSalary + stats.bonusSalary).toLocaleString()}</div>
                                        <div className="text-xs text-brand-200 opacity-70 mt-2">Vs base trajectory</div>
                                    </div>
                                    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                        <div className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-2">Time Saved</div>
                                        <div className="text-3xl font-black text-amber-400">{Math.abs(stats.weeksSaved)} weeks</div>
                                        <div className="text-xs text-brand-200 opacity-70 mt-2">Faster transition</div>
                                    </div>
                                </div>

                                <button onClick={reset} className="px-8 py-3 rounded-full bg-white text-brand-900 font-bold hover:scale-105 transition-transform shadow-lg">
                                    Run Another Scenario
                                </button>
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Final Feedback Review</h3>
                            <div className="space-y-4">
                                {history.map((h, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${h.choice.timeImpact < 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {h.choice.timeImpact < 0 ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm mb-1">{h.scenario.title}</p>
                                            <p className="text-slate-600 text-sm">{h.choice.feedback}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
