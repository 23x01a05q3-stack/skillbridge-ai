import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Check, Target, Briefcase, Layout, Star, ArrowUpCircle } from 'lucide-react';

const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springTransition
    }
};

const Dashboard = ({ data }) => {
    const chartData = [
        { name: 'Match', value: data.matchScore },
        { name: 'Gap', value: 100 - data.matchScore },
    ];

    // Dynamic colors based on theme context (inherited from CSS variables if possible, or via logic)
    const COLORS = ['#2563eb', 'var(--bg-secondary)'];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 mt-10"
            style={{ fontFamily: 'Outfit, sans-serif' }}
        >
            <div className="grid md:grid-cols-3 gap-8">
                {/* Match Score Card */}
                <motion.div
                    variants={itemVariants}
                    className="glass overflow-hidden flex flex-col"
                    style={{ borderRadius: '24px' }}
                >
                    <div className="terminal-header h-10 px-6">
                        <Target className="w-4 h-4 text-blue-500 icon-glow-blue" />
                        <span className="font-bold">Match Confidence</span>
                    </div>
                    <div className="p-8 flex flex-col items-center relative">
                        {/* Decorative Scanner Graphic */}
                        <div className="absolute top-4 right-4 w-12 h-12 border border-blue-500/20 rounded-lg overflow-hidden flex items-center justify-center -z-10 rotate-12">
                            <div className="w-full h-[1px] bg-blue-500/30 absolute animate-pulse"></div>
                            <div className="w-[1px] h-full bg-blue-500/30 absolute animate-pulse"></div>
                        </div>
                        <div className="h-64 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-blue-500" style={{ letterSpacing: '-0.01em' }}>{data.matchScore}%</span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-3 font-bold opacity-70">Match Score</span>
                            </div>
                        </div>
                        <div className="mt-12 text-sm text-slate-500 text-center leading-relaxed px-2">
                            Based on the analysis of your skills, you have a <span className="text-blue-400 font-bold">{data.matchScore > 70 ? 'strong' : 'solid'} alignment</span> with this role.
                        </div>
                    </div>
                </motion.div>

                {/* Skill Breakdown */}
                <motion.div
                    variants={itemVariants}
                    className="glass overflow-hidden md:col-span-2 flex flex-col"
                    style={{ borderRadius: '24px' }}
                >
                    <div className="terminal-header h-10 px-6">
                        <Layout className="w-3 h-3 text-blue-500" />
                        <span className="font-bold">Skills Snapshot</span>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8 pb-4 border-slate-800" style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-blue-600 icon-glow-blue" /> {data.role}
                            </h3>
                            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Analysis Complete</span>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div>
                                <h4 className="text-xs font-black text-emerald-400 mb-5 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-emerald-500 icon-glow-emerald" /> Your Top Skills
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {data.matchedSkills.map(skill => (
                                        <motion.span
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                                            key={skill}
                                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 text-[11px] font-black tracking-wider uppercase font-mono shadow-md backdrop-blur-sm"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                    {data.matchedSkills.length === 0 && <span className="text-slate-500 text-xs italic opacity-50 font-mono">NO CORE MATCHES DETECTED</span>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black text-amber-500 mb-5 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <ArrowUpCircle className="w-4 h-4 icon-glow-violet opacity-80" /> Recommended to Develop
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {data.missingSkills.map(skill => (
                                        <motion.span
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(217, 119, 6, 0.2)' }}
                                            key={skill}
                                            className="px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 text-[11px] font-black tracking-wider uppercase font-mono shadow-sm"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Extracted Skills Summary */}
            <motion.div
                variants={itemVariants}
                className="glass overflow-hidden"
                style={{ borderRadius: '24px' }}
            >
                <div className="terminal-header h-10 px-6">
                    <Star className="w-3 h-3 text-blue-500" />
                    <span className="font-bold">Identified Expertise</span>
                </div>
                <div className="p-8 bg-slate-900/10">
                    <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-8 opacity-60">
                        Synthesized Professional Competencies:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {data.extractedSkills.map(skill => (
                            <motion.div
                                whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                key={skill}
                                className="px-4 py-2.5 bg-white/5 text-slate-400 rounded-lg text-[11px] border border-white/5 transition-all font-bold tracking-tight flex items-center gap-2 group hover-border-blue-500/30 overflow-hidden"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover-bg-blue-500 transition-colors"></div>
                                <span className="truncate">{skill}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
