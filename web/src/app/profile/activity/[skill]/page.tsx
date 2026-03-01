import Link from "next/link";
import { ArrowLeft, Clock, Award, Star, TrendingUp, Calendar, ExternalLink } from "lucide-react";

export default async function SkillActivityPage({ params }: { params: Promise<{ skill: string }> }) {
    const { skill: encodedSkill } = await params;
    const skill = decodeURIComponent(encodedSkill);

    const activities = [
        { date: "Yesterday", type: "Course", title: `Advanced ${skill} Patterns`, provider: "Coursera", hours: 2, points: "+50 XP" },
        { date: "Last Week", type: "Project", title: `Built REST API using ${skill}`, provider: "GitHub", hours: 5, points: "+150 XP" },
        { date: "2 Weeks Ago", type: "Assessment", title: `${skill} Core Competency Test`, provider: "TransSkill", hours: 1, points: "Passed" },
        { date: "Last Month", type: "Course", title: `${skill} Fundamentals`, provider: "Udemy", hours: 10, points: "+300 XP" },
    ];

    return (
        <div className="min-h-screen bg-section-profile bg-dots p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/profile" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">{skill} Activity Log</h1>
                        <p className="text-slate-500 font-medium mt-1">Track your progress and learning history</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Time Invested</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-slate-800">
                            <Clock className="w-6 h-6 text-brand-500" />
                            18 Hours
                        </div>
                    </div>
                    <div className="glass-card p-5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Level</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-emerald-600">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                            Advanced
                        </div>
                    </div>
                    <div className="glass-card p-5 border-amber-200 bg-amber-50/50">
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Skill Mastery</div>
                        <div className="flex items-center gap-2 text-2xl font-black text-amber-600">
                            <Star className="w-6 h-6 text-amber-500" />
                            78%
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-brand-500" />
                        Learning History
                    </h2>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-200 before:to-transparent">
                        {activities.map((act, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="w-10 h-10 rounded-full border-4 border-white bg-brand-500 text-white flex items-center justify-center shadow-md absolute left-0 md:left-1/2 -translate-x-1/2 shrink-0 z-10 transition-transform group-hover:scale-110">
                                    <Award className="w-4 h-4" />
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white hover:border-brand-200 shadow-sm hover:shadow-md transition-all ml-16 md:ml-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-slate-400">{act.date}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.type === 'Course' ? 'bg-blue-50 text-blue-600' :
                                            act.type === 'Project' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>{act.type}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-1">{act.title}</h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">{act.provider}</span>
                                        <span className="font-bold text-brand-600">{act.points}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
