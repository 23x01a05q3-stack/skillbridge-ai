import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Auth attempt for:", email);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 font-mono" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={springTransition}
                className="glass w-full max-w-md overflow-hidden"
                style={{ borderRadius: '32px' }}
            >
                <div className="terminal-header bg-slate-50 h-14 px-8 flex items-center border-b border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="ml-3 font-bold text-xs tracking-widest text-slate-500">Secure Access Portal</span>
                </div>

                <div className="p-10 pt-12">
                    <Link to="/" className="inline-flex items-center text-slate-400 hover:text-slate-900 mb-10 text-xs font-bold uppercase tracking-widest transition-colors group no-underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="mb-14">
                        <h1 className="text-6xl font-black gradient-text mb-4 uppercase tracking-tighter leading-none">Welcome</h1>
                        <p className="text-slate-500 text-lg leading-relaxed opacity-90">Sign in to access your personalized career growth dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        <motion.div whileHover={{ y: -2 }} transition={springTransition}>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4.5 w-4.5 h-4.5 text-slate-600" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-slate-50 border border-slate-200 p-4.5 pl-13 text-sm text-slate-900 transition-all outline-none focus:border-blue-400 focus:bg-white"
                                    style={{ borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -2 }} transition={springTransition}>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4.5 w-4.5 h-4.5 text-slate-600" />
                                <input
                                    type="password"
                                    placeholder="Your secure password"
                                    className="w-full bg-slate-50 border border-slate-200 p-4.5 pl-13 text-sm text-slate-900 transition-all outline-none focus:border-blue-400 focus:bg-white"
                                    style={{ borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </motion.div>

                        <div className="flex justify-between items-center text-xs font-bold tracking-wide">
                            <label className="flex items-center text-slate-500 cursor-pointer hover:text-slate-900">
                                <input type="checkbox" className="mr-3 w-4 h-4 rounded border-slate-300 bg-white" />
                                Remember Me
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-800 no-underline">Forgot Password?</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springTransition}
                            type="submit"
                            style={{ height: '64px' }}
                            className="btn-primary w-full"
                        >
                            <LogIn className="w-5 h-5" />
                            <span className="tracking-widest font-black">SIGN IN</span>
                        </motion.button>
                    </form>

                    <p className="mt-12 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                        Don't have an account? <a href="#" className="text-blue-500 no-underline hover:text-blue-400 ml-1">Create One</a>
                    </p>
                </div>

                <div className="px-10 py-8 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 text-center flex items-center justify-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-red-500/60" />
                    <span className="font-bold tracking-widest uppercase">Built for your career success</span>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
