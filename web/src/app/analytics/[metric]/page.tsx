"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Clock, Target, Users, BarChart3, Activity, Brain, Zap } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line, Legend, AreaChart, Area
} from "recharts";

const metricsData: Record<string, {
    title: string; subtitle: string; icon: any; color: string;
    value: string; change: string; description: string;
    insights: { label: string; value: string; trend: string }[];
    tips: string[];
}> = {
    "skills-tracked": {
        title: "Skills Tracked",
        subtitle: "Complete breakdown of your skill portfolio",
        icon: Brain,
        color: "#6366F1",
        value: "5",
        change: "+2 this week",
        description: "You're actively tracking 5 skills across multiple domains. Diversifying your skill set increases your employability by 40% according to LinkedIn's latest workforce report. Focus on complementary skills that create unique value combinations.",
        insights: [
            { label: "Active Skills", value: "5", trend: "+2" },
            { label: "Mastered", value: "2", trend: "—" },
            { label: "In Progress", value: "3", trend: "+1" },
            { label: "Avg. Proficiency", value: "72%", trend: "+8%" },
        ],
        tips: [
            "Add at least 2 more complementary skills to strengthen your T-shaped profile",
            "Skills in DevOps and Cloud are trending — consider adding AWS or Docker",
            "Your frontend skills are strong; pair them with backend for full-stack readiness",
            "Review your skill gaps weekly to maintain momentum",
        ],
    },
    "hours-logged": {
        title: "Hours Logged",
        subtitle: "Your weekly learning activity breakdown",
        icon: Clock,
        color: "#10B981",
        value: "34.5h",
        change: "+12% vs last week",
        description: "You've invested 34.5 hours in skill development this week, exceeding the recommended 25 hours for rapid career transition. Consistent daily practice of 4-5 hours is proven to be more effective than weekend cramming sessions.",
        insights: [
            { label: "This Week", value: "34.5h", trend: "+12%" },
            { label: "Daily Average", value: "4.9h", trend: "+0.5h" },
            { label: "Peak Day", value: "Saturday", trend: "7.2h" },
            { label: "Streak", value: "12 days", trend: "🔥" },
        ],
        tips: [
            "Your Saturday sessions are your most productive — try to replicate that focus on weekdays",
            "Consider the Pomodoro technique: 25 min focus + 5 min break for sustained learning",
            "Morning study sessions show 23% better retention according to research",
            "Mix theory (videos/reading) with hands-on practice for optimal learning",
        ],
    },
    "readiness-score": {
        title: "Readiness Score",
        subtitle: "Your career transition readiness assessment",
        icon: Target,
        color: "#8B5CF6",
        value: "78%",
        change: "+5% this week",
        description: "Your career readiness score of 78% indicates you're well on track for your target role transition. The score factors in skill proficiency, project experience, and market alignment. Reaching 85% typically correlates with successful role transitions within 30 days.",
        insights: [
            { label: "Overall Score", value: "78%", trend: "+5%" },
            { label: "Technical", value: "82%", trend: "+3%" },
            { label: "Projects", value: "65%", trend: "+8%" },
            { label: "Market Fit", value: "88%", trend: "+2%" },
        ],
        tips: [
            "Build 2-3 portfolio projects to boost your Projects score from 65% to 80%+",
            "Your Technical score is strong — focus on practical application now",
            "Market Fit at 88% means employers are actively hiring for your skill combination",
            "Target 85% readiness before applying — it doubles your interview callback rate",
        ],
    },
    "career-matches": {
        title: "Career Matches",
        subtitle: "Roles that align with your current skill profile",
        icon: Users,
        color: "#F59E0B",
        value: "12",
        change: "+3 new matches",
        description: "Based on your current skill profile, 12 career paths show strong alignment. These matches consider skill overlap, market demand, salary potential, and growth trajectory. The top matches show 80%+ compatibility with your existing skills.",
        insights: [
            { label: "Total Matches", value: "12", trend: "+3" },
            { label: "High Fit (80%+)", value: "4", trend: "+1" },
            { label: "Avg. Salary", value: "$125K", trend: "+8%" },
            { label: "Open Roles", value: "2.3K", trend: "+15%" },
        ],
        tips: [
            "Focus on your top 3 matches — spreading too thin reduces effectiveness",
            "The Full-Stack Developer role has the highest demand-to-supply ratio",
            "Machine Learning Engineer shows 92% growth trajectory for the next 3 years",
            "Consider informational interviews with professionals in your top match roles",
        ],
    },
    "skill-distribution": {
        title: "Skill Distribution",
        subtitle: "How your skills are distributed across domains",
        icon: BarChart3,
        color: "#818CF8",
        value: "5 Categories",
        change: "Well balanced",
        description: "Your skills span 5 key technology domains. A balanced distribution indicates versatility, but consider deepening expertise in 1-2 areas for a 'T-shaped' profile that employers highly value. Frontend is your strongest area at 35%.",
        insights: [
            { label: "Frontend", value: "35%", trend: "Primary" },
            { label: "Backend", value: "25%", trend: "Growing" },
            { label: "Data", value: "20%", trend: "Emerging" },
            { label: "DevOps", value: "12%", trend: "Learning" },
        ],
        tips: [
            "Your Frontend dominance is an asset — consider specializing in React or Next.js",
            "Backend at 25% complements your frontend — Node.js or Python would create full-stack capability",
            "Data skills (20%) are increasingly valuable — SQL and basic ML knowledge are high-ROI",
            "Invest in DevOps basics (Docker, CI/CD) to stand out as a well-rounded developer",
        ],
    },
    "weekly-activity": {
        title: "Weekly Activity",
        subtitle: "Your daily learning patterns and trends",
        icon: Activity,
        color: "#6366F1",
        value: "34.5h total",
        change: "Exceeding target",
        description: "Your learning activity shows a consistent upward trend with peak productivity on weekends. The daily target of 3 hours is being exceeded on most days, which is excellent. Your Wednesday to Saturday ramp-up suggests you build momentum through the week.",
        insights: [
            { label: "Mon-Fri Avg", value: "4.3h", trend: "+0.3h" },
            { label: "Weekend Avg", value: "6.5h", trend: "+1.2h" },
            { label: "Best Day", value: "Saturday", trend: "7.2h" },
            { label: "Target Hit Rate", value: "86%", trend: "+12%" },
        ],
        tips: [
            "Your Thursday dip to 2.8h — try scheduling lighter review sessions for consistency",
            "Weekend productivity is excellent — consider batch-learning complex topics on Saturdays",
            "Aim for minimum 3h daily (your target) to maintain neuroplasticity benefits",
            "Track which activities (videos, coding, reading) correlate with your most productive days",
        ],
    },
    "career-readiness": {
        title: "Career Readiness",
        subtitle: "Detailed assessment of your transition readiness",
        icon: Zap,
        color: "#4F46E5",
        value: "78%",
        change: "+5% this week",
        description: "Your 78% readiness score is calculated from multiple dimensions: technical skills proficiency, project portfolio strength, market alignment, and soft skills assessment. You're in the 'almost ready' zone — most successful career transitioners reach 85% before making their move.",
        insights: [
            { label: "Technical Skills", value: "82%", trend: "+3%" },
            { label: "Portfolio", value: "65%", trend: "+8%" },
            { label: "Market Alignment", value: "88%", trend: "+2%" },
            { label: "Soft Skills", value: "75%", trend: "+4%" },
        ],
        tips: [
            "Portfolio is your biggest opportunity — build 2-3 showcase projects",
            "Your technical skills at 82% are competitive for most mid-level roles",
            "88% market alignment means your skills are in-demand — great timing for a transition",
            "Improve soft skills through open-source contribution and technical writing",
        ],
    },
    "skill-proficiency": {
        title: "Skill Proficiency Radar",
        subtitle: "Your skills vs target role requirements",
        icon: TrendingUp,
        color: "#2EE6D6",
        value: "6 Dimensions",
        change: "2 gaps identified",
        description: "The radar chart compares your current skill levels against the requirements of your target role. You exceed requirements in Frontend (85 vs 70) and Soft Skills (80 vs 55), but have gaps in Backend (65 vs 80) and DevOps (45 vs 60). Closing these 2 gaps will accelerate your readiness.",
        insights: [
            { label: "Strengths", value: "Frontend, Soft Skills", trend: "Above target" },
            { label: "On Track", value: "System Design", trend: "Close to target" },
            { label: "Gap Areas", value: "Backend, DevOps", trend: "Below target" },
            { label: "Biggest Gap", value: "DevOps (-15)", trend: "Priority" },
        ],
        tips: [
            "DevOps gap (-15 points) is your highest priority — start with Docker and basic CI/CD",
            "Backend gap (-15 points) can be closed with a focused Node.js or Python course",
            "Your Frontend surplus (+15) gives you a competitive edge — leverage it in interviews",
            "System Design at 70 vs 65 is close — strengthen with 1-2 system design practice sessions per week",
        ],
    },
};

export default function AnalyticsDetailPage() {
    const params = useParams();
    const metric = params.metric as string;
    const data = metricsData[metric];

    if (!data) {
        return (
            <div className="min-h-screen bg-section-dashboard bg-dots p-6 md:p-10 flex items-center justify-center">
                <div className="glass-panel p-10 text-center max-w-md">
                    <h2 className="text-2xl font-black text-slate-800 mb-3">Metric Not Found</h2>
                    <p className="text-slate-500 mb-6">The analytics metric you are looking for does not exist.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = data.icon;

    const monthlyTrend = [
        { week: "W1", value: 45 }, { week: "W2", value: 52 }, { week: "W3", value: 61 },
        { week: "W4", value: 78 },
    ];

    const breakdownData = [
        { name: "Frontend", value: 35, fill: "#818CF8" },
        { name: "Backend", value: 25, fill: "#2EE6D6" },
        { name: "Data", value: 20, fill: "#A78BFA" },
        { name: "DevOps", value: 12, fill: "#FB923C" },
        { name: "Soft Skills", value: 8, fill: "#F472B6" },
    ];

    const dailyData = [
        { day: "Mon", hours: 4.5, target: 3 }, { day: "Tue", hours: 3.2, target: 3 },
        { day: "Wed", hours: 5.1, target: 3 }, { day: "Thu", hours: 2.8, target: 3 },
        { day: "Fri", hours: 6.0, target: 3 }, { day: "Sat", hours: 7.2, target: 3 },
        { day: "Sun", hours: 5.7, target: 3 },
    ];

    const radarData = [
        { subject: "Frontend", A: 85, B: 70 }, { subject: "Backend", A: 65, B: 80 },
        { subject: "DevOps", A: 45, B: 60 }, { subject: "Data Science", A: 55, B: 75 },
        { subject: "System Design", A: 70, B: 65 }, { subject: "Soft Skills", A: 80, B: 55 },
    ];

    return (
        <div className="min-h-screen bg-section-dashboard bg-dots p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto space-y-8"
            >
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: data.color, filter: "blur(60px)" }} />
                    <div className="relative z-10 flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${data.color}15` }}>
                            <Icon className="w-8 h-8" style={{ color: data.color }} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-slate-900 mb-1">{data.title}</h1>
                            <p className="text-sm text-slate-500 mb-4">{data.subtitle}</p>
                            <div className="flex items-end gap-3">
                                <span className="text-5xl font-black" style={{ color: data.color }}>{data.value}</span>
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg mb-2">{data.change}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Insight Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.insights.map((insight, i) => (
                        <motion.div
                            key={insight.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            className="stat-card glass-panel p-5 rounded-2xl"
                        >
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{insight.label}</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-black text-slate-900">{insight.value}</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">{insight.trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Description Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-brand-600" />
                        What This Means
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{data.description}</p>
                </motion.div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Monthly Trend */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="glass-panel p-6 chart-container"
                    >
                        <h3 className="text-sm font-bold text-slate-700 mb-4">Monthly Trend</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={data.color} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={data.color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                                <Area type="monotone" dataKey="value" stroke={data.color} strokeWidth={2.5} fill="url(#trendGrad)" dot={{ r: 5, fill: data.color, strokeWidth: 2, stroke: "#fff" }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Distribution or Activity */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="glass-panel p-6 chart-container"
                    >
                        <h3 className="text-sm font-bold text-slate-700 mb-4">
                            {metric.includes("skill") ? "Skill Breakdown" : "Daily Breakdown"}
                        </h3>
                        <ResponsiveContainer width="100%" height={220}>
                            {metric.includes("skill") || metric === "career-matches" ? (
                                <PieChart>
                                    <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none" />
                                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", fontWeight: 600 }} />
                                </PieChart>
                            ) : (
                                <BarChart data={dailyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                                    <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                                        {dailyData.map((_, i) => (
                                            <Cell key={i} fill={i === 5 ? "#4F46E5" : "#818CF8"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Radar (for proficiency/readiness) */}
                {(metric === "skill-proficiency" || metric === "career-readiness" || metric === "readiness-score") && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="glass-panel p-6 chart-container"
                    >
                        <h3 className="text-sm font-bold text-slate-700 mb-4">Skills vs Target Role</h3>
                        <ResponsiveContainer width="100%" height={320}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#E2E8F0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748B" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Your Skills" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
                                <Radar name="Target Role" dataKey="B" stroke="#2EE6D6" fill="#2EE6D6" fillOpacity={0.1} strokeWidth={2} />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", fontWeight: 600 }} />
                                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", fontSize: "12px" }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}

                {/* Actionable Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        Actionable Recommendations
                    </h3>
                    <div className="space-y-3">
                        {data.tips.map((tip, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + i * 0.1 }}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0" style={{ background: `${data.color}15`, color: data.color }}>
                                    {i + 1}
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed pt-1">{tip}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-wrap gap-3"
                >
                    {Object.entries(metricsData)
                        .filter(([key]) => key !== metric)
                        .slice(0, 4)
                        .map(([key, m]) => (
                            <Link
                                key={key}
                                href={`/analytics/${key}`}
                                className="stat-card glass-panel px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition-all"
                            >
                                <m.icon className="w-4 h-4" style={{ color: m.color }} />
                                {m.title}
                            </Link>
                        ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
