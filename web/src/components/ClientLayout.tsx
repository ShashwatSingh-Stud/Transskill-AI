"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";
import AuthPage from "@/components/AuthPage";

function AppShell({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, darkMode } = useTheme();

    if (!isLoggedIn) {
        return <AuthPage />;
    }

    return (
        <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AppShell>{children}</AppShell>
        </ThemeProvider>
    );
}
