"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BrainCircuit, LayoutDashboard, Map, Compass, User, Settings, LogOut } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { setIsLoggedIn, setUserName, setUserEmail, setUserRole, userName } = useTheme();

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/roadmap", label: "My Roadmap", icon: Map },
        { href: "/simulator", label: "Career Simulator", icon: Compass },
        { href: "/profile", label: "Profile", icon: User },
    ];

    const handleSignOut = () => {
        if (confirm("Are you sure you want to sign out?")) {
            localStorage.removeItem("ts-auth");
            setUserName("");
            setUserEmail("");
            setUserRole("");
            setIsLoggedIn(false);
        }
    };

    return (
        <aside className="w-64 h-full bg-white/80 backdrop-blur-xl border-r border-white/60 flex flex-col pt-8 pb-6 shadow-[0_0_40px_rgba(0,0,0,0.03)] hidden md:flex">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="px-8 mb-12 flex items-center gap-3"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-highlight flex items-center justify-center shadow-lg shadow-brand-500/20 glow-brand">
                    <BrainCircuit className="text-white w-6 h-6" />
                </div>
                <div className="leading-tight">
                    <h1 className="text-xl font-black tracking-tight">TransSkill</h1>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-brand-600">Enterprise AI</p>
                </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5">
                {links.map((link, i) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${isActive
                                    ? "bg-gradient-to-r from-brand-50 to-accent-50 text-brand-900 border border-brand-100/60 shadow-[0_4px_12px_rgba(44,47,140,0.06)]"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-brand-600" : ""}`} />
                                {link.label}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* User section */}
            {userName && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="px-6 mb-4"
                >
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-highlight flex items-center justify-center text-white font-bold text-sm">
                            {userName[0]?.toUpperCase()}
                        </div>
                        <div className="truncate">
                            <p className="text-sm font-bold truncate">{userName}</p>
                            <p className="text-[10px] text-slate-400">Free Plan</p>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="px-4 space-y-1.5 mt-auto">
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${pathname === '/settings'
                        ? 'bg-slate-100 text-slate-800 border border-slate-200'
                        : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
                        }`}>
                        <Settings className="w-4 h-4" /> Settings
                    </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all w-full border border-transparent">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </motion.div>
            </div>
        </aside>
    );
}
