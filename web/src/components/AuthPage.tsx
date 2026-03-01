"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, ArrowRight, Mail, Lock, User, Briefcase, Eye, EyeOff, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AuthPage() {
    const { setIsLoggedIn, setUserName, setUserEmail, setUserRole, setUserPassword } = useTheme();
    const [mode, setMode] = useState<"signin" | "signup" | "onboarding">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Onboarding fields
    const [onboardRole, setOnboardRole] = useState("");
    const [onboardExperience, setOnboardExperience] = useState("");
    const [onboardGoal, setOnboardGoal] = useState("");

    const handleSignIn = () => {
        if (!email || !password) { setError("Please fill in all fields"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setError("");
        setUserEmail(email);
        setUserPassword(password);
        setUserName(email.split("@")[0]);
        setMode("onboarding");
    };

    const handleSignUp = () => {
        if (!name || !email || !password || !confirmPassword) { setError("Please fill in all fields"); return; }
        if (password !== confirmPassword) { setError("Passwords don't match"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setError("");
        setUserName(name);
        setUserEmail(email);
        setUserPassword(password);
        setMode("onboarding");
    };

    const handleCompleteOnboarding = () => {
        if (!onboardRole) { setError("Please select your current role"); return; }
        setUserRole(onboardRole);
        setIsLoggedIn(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-mesh bg-dots p-6 relative overflow-hidden">
            {/* Floating orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-highlight flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <BrainCircuit className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900">TransSkill<span className="text-brand-600">.AI</span></h1>
                    <p className="text-slate-500 text-sm mt-1">Predict skill transferability. Maximize employability.</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Sign In */}
                    {mode === "signin" && (
                        <motion.div key="signin" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-panel p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Welcome back</h2>

                            {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{error}</div>}

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleSignIn}
                                className="w-full mt-6 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg relative group overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">Sign In <ArrowRight className="w-5 h-5" /></span>
                            </button>

                            <p className="text-center text-sm text-slate-500 mt-6">
                                Don&apos;t have an account?{" "}
                                <button onClick={() => { setMode("signup"); setError(""); }} className="text-brand-600 font-bold hover:underline">Create one</button>
                            </p>
                        </motion.div>
                    )}

                    {/* Sign Up */}
                    {mode === "signup" && (
                        <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Create your account</h2>

                            {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{error}</div>}

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="Min 6 characters"
                                            className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="Repeat password"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleSignUp}
                                className="w-full mt-6 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg relative group overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">Create Account <Sparkles className="w-5 h-5" /></span>
                            </button>

                            <p className="text-center text-sm text-slate-500 mt-6">
                                Already have an account?{" "}
                                <button onClick={() => { setMode("signin"); setError(""); }} className="text-brand-600 font-bold hover:underline">Sign in</button>
                            </p>
                        </motion.div>
                    )}

                    {/* Onboarding */}
                    {mode === "onboarding" && (
                        <motion.div key="onboarding" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-panel p-8">
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-2">🚀</div>
                                <h2 className="text-xl font-bold text-slate-800">Let&apos;s set up your profile</h2>
                                <p className="text-sm text-slate-500">This helps us personalize your experience</p>
                            </div>

                            {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{error}</div>}

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">What&apos;s your current role?</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <select value={onboardRole} onChange={e => setOnboardRole(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors appearance-none cursor-pointer">
                                            <option value="">Select your role...</option>
                                            <option>Student</option>
                                            <option>Junior Developer</option>
                                            <option>Frontend Developer</option>
                                            <option>Backend Developer</option>
                                            <option>Full Stack Developer</option>
                                            <option>Data Analyst</option>
                                            <option>Data Scientist</option>
                                            <option>DevOps Engineer</option>
                                            <option>Product Manager</option>
                                            <option>Designer</option>
                                            <option>Career Changer</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">Experience Level</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Beginner", "Intermediate", "Advanced"].map(lvl => (
                                            <button key={lvl} onClick={() => setOnboardExperience(lvl)}
                                                className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${onboardExperience === lvl
                                                    ? "border-brand-500 bg-brand-50 text-brand-700"
                                                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                                                    }`}>
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-600 mb-1.5 block">What&apos;s your career goal?</label>
                                    <textarea value={onboardGoal} onChange={e => setOnboardGoal(e.target.value)}
                                        placeholder="e.g., Transition to ML Engineering within 6 months"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium focus:border-brand-500 outline-none transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <button onClick={handleCompleteOnboarding}
                                className="w-full mt-6 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg relative group overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">Launch Dashboard <ArrowRight className="w-5 h-5" /></span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
