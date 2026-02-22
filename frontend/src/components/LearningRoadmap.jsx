import React from 'react';
import { BookOpen, Code, Award, GraduationCap, Map, Book, Check, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';

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
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition
    }
};

const LearningRoadmap = ({ recommendations }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-20 mb-20 px-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
        >
            <motion.div
                variants={itemVariants}
                className="flex items-center gap-6 mb-12 overflow-hidden"
            >
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-slate-400" style={{ opacity: 0.2 }}></div>
                <div className="flex items-center gap-3">
                    <Map className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-black text-white px-2 tracking-tighter uppercase" style={{ letterSpacing: '-0.02em' }}>
                        Your Path to Mastery
                    </h2>
                </div>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-slate-400" style={{ opacity: 0.2 }}></div>
            </motion.div>

            <div className="flex flex-col gap-10">
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={rec.skill}
                        variants={itemVariants}
                        className="glass overflow-hidden group border-0"
                        style={{ borderRadius: '28px' }}
                    >
                        <div className="terminal-header flex justify-between px-8 py-4">
                            <div className="flex items-center gap-3">
                                <Book className="w-4 h-4 text-blue-600 icon-glow-blue" />
                                <span className="font-bold text-xs tracking-wide">Training Module: {rec.skill}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border-0">Recommended Focus</span>
                        </div>

                        <div className="p-10 flex flex-col gap-12">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className="w-20 h-20 bg-blue-600/5 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-sm"
                                >
                                    <GraduationCap className="w-10 h-10 text-blue-600 icon-glow-blue" />
                                </motion.div>
                                <div className="text-center md-text-left">
                                    <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{rec.skill} Specialization</h3>
                                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                                        Master this core competency through structured learning path designed to bridge your expertise gap.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-10">
                                <div className="flex flex-col gap-6">
                                    <h4 className="flex items-center gap-3 text-sm font-bold text-blue-400 uppercase tracking-widest">
                                        <BookOpen className="w-4 h-4" /> Curriculum
                                    </h4>
                                    <ul className="text-slate-400 text-sm flex flex-col gap-4">
                                        {rec.topics.map(topic => (
                                            <li key={topic} className="flex gap-3 items-start p-3 bg-slate-900/10 rounded-xl border border-slate-700/20 shadow-sm">
                                                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <span className="font-bold">{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <h4 className="flex items-center gap-3 text-sm font-bold text-amber-400 uppercase tracking-widest">
                                        <Code className="w-4 h-4" /> Hands-on Projects
                                    </h4>
                                    <ul className="text-slate-400 text-sm flex flex-col gap-4">
                                        {rec.projects.map(proj => (
                                            <li key={proj} className="flex gap-3 items-start p-3 bg-slate-900/10 rounded-xl border border-slate-700/20 shadow-sm">
                                                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0 fill-amber-500" />
                                                <span className="font-bold">{proj}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <h4 className="flex items-center gap-3 text-sm font-bold text-emerald-400 uppercase tracking-widest">
                                        <Award className="w-4 h-4" /> Certification
                                    </h4>
                                    <ul className="text-slate-400 text-sm flex flex-col gap-4">
                                        {rec.certifications.map(cert => (
                                            <li key={cert} className="flex gap-3 items-start p-3 bg-slate-900/10 rounded-xl border border-slate-700/20 shadow-sm">
                                                <Award className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                <span className="font-bold">{cert}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-5 bg-slate-900/10 border-t border-slate-800/10 text-xs text-slate-500 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Info className="w-3.5 h-3.5" />
                                <span className="font-bold">Verified Curriculum // Updated for 2026 Standards</span>
                            </div>
                            <span className="font-black text-blue-600 tracking-widest cursor-pointer hover:text-blue-800 transition-colors">BEGIN MODULE</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default LearningRoadmap;
