"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, Moon, Sun, Bell, BellOff, Shield, Download, Globe, Palette,
    Monitor, Smartphone, ChevronRight, ToggleLeft, ToggleRight, User, Lock, X, Check, Eye, EyeOff
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type AccentTheme = "indigo" | "purple" | "emerald" | "rose" | "amber";

export default function SettingsPage() {
    const { darkMode, toggleDarkMode, accent, setAccent, userPassword, setUserPassword } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [sound, setSound] = useState(false);

    // Password change
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const handleChangePassword = () => {
        if (!currentPw || !newPw || !confirmPw) { setPwError("Please fill in all fields"); return; }
        if (currentPw !== userPassword) { setPwError("Current password is incorrect"); return; }
        if (newPw.length < 6) { setPwError("New password must be at least 6 characters"); return; }
        if (newPw !== confirmPw) { setPwError("New passwords don't match"); return; }
        setPwError("");
        setUserPassword(newPw);
        setPwSuccess(true);
        setTimeout(() => {
            setShowPasswordModal(false);
            setPwSuccess(false);
            setCurrentPw("");
            setNewPw("");
            setConfirmPw("");
        }, 1500);
    };

    const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
        <button onClick={onToggle} className="transition-colors">
            {enabled
                ? <ToggleRight className="w-8 h-8 text-brand-600" />
                : <ToggleLeft className="w-8 h-8 text-slate-300" />
            }
        </button>
    );

    const themes: { key: AccentTheme; color: string; label: string }[] = [
        { key: "indigo", color: "bg-gradient-to-r from-brand-600 to-accent-500", label: "Indigo Cyan" },
        { key: "purple", color: "bg-gradient-to-r from-violet-600 to-purple-500", label: "Purple" },
        { key: "emerald", color: "bg-gradient-to-r from-emerald-600 to-teal-500", label: "Emerald" },
        { key: "rose", color: "bg-gradient-to-r from-rose-600 to-pink-500", label: "Rose" },
        { key: "amber", color: "bg-gradient-to-r from-amber-600 to-orange-500", label: "Amber" },
    ];

    return (
        <div className="min-h-screen bg-section-settings bg-dots p-6 md:p-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-black">Settings</h1>
                    </div>
                    <p className="text-slate-500 ml-13">Customize your TransSkill AI experience</p>
                </div>

                <div className="max-w-3xl space-y-6">
                    {/* Appearance */}
                    <div className="glass-panel p-6">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-violet-500" />
                            Appearance
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 transition-colors">
                                <div className="flex items-center gap-3">
                                    {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                                    <div>
                                        <p className="font-semibold">Dark Mode</p>
                                        <p className="text-xs text-slate-400">
                                            {darkMode ? "Dark theme is active" : "Switch to dark theme"}
                                        </p>
                                    </div>
                                </div>
                                <Toggle enabled={darkMode} onToggle={toggleDarkMode} />
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Monitor className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="font-semibold">Theme Color</p>
                                        <p className="text-xs text-slate-400">Active: <span className="font-bold text-brand-600 capitalize">{accent}</span></p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {themes.map((theme) => (
                                        <button
                                            key={theme.key}
                                            onClick={() => setAccent(theme.key)}
                                            className={`w-12 h-12 rounded-xl ${theme.color} shadow-md hover:scale-110 transition-all ${accent === theme.key ? 'ring-2 ring-brand-300 ring-offset-2 scale-110' : ''}`}
                                            title={theme.label}
                                        >
                                            {accent === theme.key && <Check className="w-5 h-5 text-white mx-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="glass-panel p-6">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-brand-500" />
                            Notifications
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: "Push Notifications", desc: "Get notified about new predictions and milestones", enabled: notifications, toggle: () => setNotifications(!notifications), icon: notifications ? Bell : BellOff },
                                { label: "Email Updates", desc: "Weekly progress reports and learning suggestions", enabled: emailUpdates, toggle: () => setEmailUpdates(!emailUpdates), icon: Globe },
                                { label: "Sound Effects", desc: "Play sounds for achievements and completions", enabled: sound, toggle: () => setSound(!sound), icon: Smartphone },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-slate-500" />
                                        <div>
                                            <p className="font-semibold">{item.label}</p>
                                            <p className="text-xs text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                    <Toggle enabled={item.enabled} onToggle={item.toggle} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account */}
                    <div className="glass-panel p-6">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-emerald-500" />
                            Account & Privacy
                        </h2>
                        <div className="space-y-3">
                            <a href="/profile" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="font-semibold">Edit Profile</p>
                                        <p className="text-xs text-slate-400">Update your name, bio, and avatar</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                            </a>

                            <button onClick={() => setShowPasswordModal(true)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all group text-left">
                                <div className="flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="font-semibold">Change Password</p>
                                        <p className="text-xs text-slate-400">Update your account password</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                            </button>

                            <button onClick={() => {
                                const data = { theme: { darkMode, accent }, exportedAt: new Date().toISOString() };
                                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a"); a.href = url; a.download = "transkill-export.json"; a.click();
                            }} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all group text-left">
                                <div className="flex items-center gap-3">
                                    <Download className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="font-semibold">Export Data</p>
                                        <p className="text-xs text-slate-400">Download all your data as JSON</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="glass-panel p-6 border-red-100">
                        <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50 border border-red-100">
                            <div>
                                <p className="font-semibold text-red-800">Delete Account</p>
                                <p className="text-xs text-red-500">Permanently delete your account and all data</p>
                            </div>
                            <button onClick={() => {
                                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                    localStorage.removeItem("ts-auth");
                                    localStorage.removeItem("ts-theme");
                                    window.location.reload();
                                }
                            }} className="px-4 py-2 rounded-full border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Password Change Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPasswordModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="glass-panel p-8 w-full max-w-md"
                        >
                            {pwSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-700">Password Changed!</h3>
                                    <p className="text-slate-500 text-sm mt-1">Your password has been updated successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Change Password</h3>
                                        <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                            <X className="w-5 h-5 text-slate-400" />
                                        </button>
                                    </div>

                                    {pwError && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{pwError}</div>}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-bold text-slate-600 mb-1.5 block">Current Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type={showPw ? "text" : "password"} value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                                                    placeholder="Enter current password"
                                                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-slate-200 bg-white font-medium focus:border-brand-500 outline-none transition-colors"
                                                />
                                                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-slate-600 mb-1.5 block">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                                                    placeholder="Min 6 characters"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white font-medium focus:border-brand-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-slate-600 mb-1.5 block">Confirm New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                                                    placeholder="Repeat new password"
                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white font-medium focus:border-brand-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={handleChangePassword}
                                        className="w-full mt-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold relative group overflow-hidden hover:shadow-xl transition-all">
                                        <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative">Update Password</span>
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
