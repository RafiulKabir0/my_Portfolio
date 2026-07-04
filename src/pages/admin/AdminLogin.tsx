import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

type LoginState = 'login' | 'forgot_email' | 'forgot_otp';

const AdminLogin = () => {
  const [viewState, setViewState] = useState<LoginState>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  // Initialize admin password if not exists
  useEffect(() => {
    if (!localStorage.getItem('adminPassword')) {
      localStorage.setItem('adminPassword', 'admin123');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const currentPassword = localStorage.getItem('adminPassword') || 'admin123';
    const currentUsername = localStorage.getItem('adminUsername') || 'admin';
    
    if (username === currentUsername && password === currentPassword) {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // VERIFY EMAIL MATCHES PORTFOLIO DATA
    if (email !== portfolioData.personal.email) {
      setError('This email is not registered as an admin.');
      return;
    }
    
    setIsSending(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: newOtp })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccessMsg(`OTP successfully sent to ${email}! Check your inbox.`);
      } else {
        console.error("Failed to send OTP", data.error);
        // Fallback simulation if backend email is not configured
        console.log(`[SIMULATED EMAIL] To: ${email} | OTP: ${newOtp}`);
        setSuccessMsg(`Backend error: Simulated OTP sent to console for now.`);
      }

      setTimeout(() => {
        setViewState('forgot_otp');
        setSuccessMsg('');
        setIsSending(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to connect to local server for OTP', err);
      // Fallback simulation
      console.log(`[SIMULATED EMAIL] To: ${email} | OTP: ${newOtp}`);
      setSuccessMsg(`Network error: Simulated OTP sent to console for now.`);
      
      setTimeout(() => {
        setViewState('forgot_otp');
        setSuccessMsg('');
        setIsSending(false);
      }, 3000);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp === generatedOtp) {
      // Success, log them in
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid OTP code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative z-10 border border-white/10 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {viewState === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                  <Lock className="text-accent" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Login</h2>
                <p className="text-slate-500 mt-2">Sign in to manage your portfolio</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <button 
                      type="button"
                      onClick={() => setViewState('forgot_email')}
                      className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="Enter password"
                  />
                </div>

                {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</motion.p>}

                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </button>
              </form>
            </motion.div>
          )}

          {viewState === 'forgot_email' && (
            <motion.div
              key="forgot_email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setViewState('login')}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to login
              </button>
              
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <Mail className="text-blue-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password</h2>
                <p className="text-slate-500 mt-2 text-center text-sm">Enter your registered email address to receive an OTP.</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="admin@example.com"
                  />
                </div>

                {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</motion.p>}
                
                {successMsg && (
                  <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-medium leading-relaxed">{successMsg}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSending || !!successMsg}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex justify-center items-center"
                >
                  {isSending ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            </motion.div>
          )}

          {viewState === 'forgot_otp' && (
            <motion.div
              key="forgot_otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setViewState('forgot_email')}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" /> Change Email
              </button>
              
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                  <KeyRound className="text-emerald-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enter OTP</h2>
                <p className="text-slate-500 mt-2 text-center text-sm">We've sent a 6-digit code to <span className="font-semibold text-slate-700">{email}</span></p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">6-Digit Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-center tracking-[0.5em] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder="------"
                  />
                </div>

                {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</motion.p>}

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Verify & Login
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
