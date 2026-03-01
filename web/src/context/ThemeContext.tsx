"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AccentTheme = "indigo" | "purple" | "emerald" | "rose" | "amber";

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
    accent: AccentTheme;
    setAccent: (a: AccentTheme) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (v: boolean) => void;
    userName: string;
    setUserName: (n: string) => void;
    userEmail: string;
    setUserEmail: (e: string) => void;
    userRole: string;
    setUserRole: (r: string) => void;
    userPassword: string;
    setUserPassword: (p: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

const accentColors: Record<AccentTheme, { primary: string; gradient: string }> = {
    indigo: { primary: "#4F46E5", gradient: "linear-gradient(135deg, #2C2F8C, #2EE6D6)" },
    purple: { primary: "#7C3AED", gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)" },
    emerald: { primary: "#059669", gradient: "linear-gradient(135deg, #059669, #34D399)" },
    rose: { primary: "#E11D48", gradient: "linear-gradient(135deg, #E11D48, #FB7185)" },
    amber: { primary: "#D97706", gradient: "linear-gradient(135deg, #D97706, #FBBF24)" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    const [accent, setAccent] = useState<AccentTheme>("indigo");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userPassword, setUserPassword] = useState("password123");

    // Hydrate from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("ts-theme");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
                if (parsed.accent) setAccent(parsed.accent);
            } catch { }
        }
        const auth = localStorage.getItem("ts-auth");
        if (auth) {
            try {
                const p = JSON.parse(auth);
                setIsLoggedIn(true);
                setUserName(p.name || "");
                setUserEmail(p.email || "");
                setUserRole(p.role || "");
                if (p.password) setUserPassword(p.password);
            } catch { }
        }
    }, []);

    // Apply theme to DOM
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        const ac = accentColors[accent];
        root.style.setProperty("--accent-primary", ac.primary);
        root.style.setProperty("--accent-gradient", ac.gradient);
        localStorage.setItem("ts-theme", JSON.stringify({ darkMode, accent }));
    }, [darkMode, accent]);

    // Persist auth
    useEffect(() => {
        if (isLoggedIn && userName) {
            localStorage.setItem("ts-auth", JSON.stringify({ name: userName, email: userEmail, role: userRole, password: userPassword }));
        } else if (!isLoggedIn) {
            localStorage.removeItem("ts-auth");
        }
    }, [isLoggedIn, userName, userEmail, userRole, userPassword]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{
            darkMode, toggleDarkMode, accent, setAccent,
            isLoggedIn, setIsLoggedIn,
            userName, setUserName, userEmail, setUserEmail, userRole, setUserRole,
            userPassword, setUserPassword,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}
