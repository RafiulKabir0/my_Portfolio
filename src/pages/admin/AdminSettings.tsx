import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Lock, ShieldCheck, UserCog, Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';

const AdminSettings = () => {
  const { data, updateData } = usePortfolio();
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // OTP State for Forgot Password
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Username State
  const [currentUsername, setCurrentUsername] = useState('admin');
  const [newUsername, setNewUsername] = useState('');
  const [usernamePassword, setUsernamePassword] = useState('');
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');

  // Email Config State
  const [emailUser, setEmailUser] = useState(data.emailConfig?.user || '');
  const [emailPass, setEmailPass] = useState(data.emailConfig?.pass || '');
  const [emailSuccess, setEmailSuccess] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminUsername') || 'admin';
    setCurrentUsername(storedUsername);
  }, []);

  const handleSendOtp = async () => {
    setPassError('');
    setPassSuccess('');
    setIsSendingOtp(true);
    
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.personal.email, otp: newOtp })
      });
      
      const dataObj = await response.json();
      
      if (response.ok && dataObj.success) {
        setPassSuccess(`OTP sent to ${data.personal.email}! Check your inbox.`);
      } else {
        console.error("Failed to send OTP", dataObj.error);
        console.log(`[SIMULATED EMAIL] To: ${data.personal.email} | OTP: ${newOtp}`);
        setPassSuccess(`Backend error: Simulated OTP sent to console.`);
      }

      setTimeout(() => {
        setIsOtpMode(true);
        setPassSuccess('');
        setIsSendingOtp(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to connect to local server for OTP', err);
      console.log(`[SIMULATED EMAIL] To: ${data.personal.email} | OTP: ${newOtp}`);
      setPassSuccess(`Network error: Simulated OTP sent to console.`);
      
      setTimeout(() => {
        setIsOtpMode(true);
        setPassSuccess('');
        setIsSendingOtp(false);
      }, 3000);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (!isOtpMode && currentPassword !== storedPassword) {
      setPassError('Current password is incorrect');
      return;
    }

    if (isOtpMode && otp !== generatedOtp) {
      setPassError('Invalid OTP code');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match');
      return;
    }

    // Success
    localStorage.setItem('adminPassword', newPassword);
    setPassSuccess('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsOtpMode(false);
    setOtp('');
    setGeneratedOtp('');
    
    setTimeout(() => setPassSuccess(''), 3000);
  };

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');
    setUserSuccess('');

    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (usernamePassword !== storedPassword) {
      setUserError('Password is incorrect');
      return;
    }

    if (newUsername.trim().length < 3) {
      setUserError('Username must be at least 3 characters long');
      return;
    }

    // Success
    localStorage.setItem('adminUsername', newUsername.trim());
    setCurrentUsername(newUsername.trim());
    setUserSuccess('Username changed successfully!');
    setNewUsername('');
    setUsernamePassword('');
    
    setTimeout(() => setUserSuccess(''), 3000);
  };

  const handleEmailConfigChange = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({
      ...data,
      emailConfig: {
        user: emailUser,
        pass: emailPass
      }
    });
    setEmailSuccess('Email configuration saved successfully!');
    setTimeout(() => setEmailSuccess(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Change Username Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <UserCog className="text-blue-500" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
            <p className="text-sm text-slate-500">Update your admin panel username</p>
          </div>
        </div>

        <form onSubmit={handleUsernameChange} className="max-w-md space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Username</label>
            <input
              type="text"
              value={currentUsername}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">New Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter new username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm with Password</label>
            <input
              type="password"
              value={usernamePassword}
              onChange={(e) => setUsernamePassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter current password"
            />
          </div>

          {userError && <p className="text-red-500 text-sm font-medium">{userError}</p>}
          
          {userSuccess && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck size={18} />
              <p className="text-sm font-medium">{userSuccess}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all font-medium"
            >
              <Save size={18} />
              Update Username
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Lock className="text-accent" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Security Settings</h2>
            <p className="text-sm text-slate-500">Update your admin panel password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-5">
          
          <AnimatePresence mode="wait">
            {!isOtpMode ? (
              <motion.div
                key="password-mode"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-slate-700">Current Password</label>
                  <button 
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors disabled:opacity-50"
                  >
                    {isSendingOtp ? 'Sending OTP...' : 'Forgot password?'}
                  </button>
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="Enter current password"
                />
              </motion.div>
            ) : (
              <motion.div
                key="otp-mode"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-slate-700">6-Digit OTP Code</label>
                  <button 
                    type="button"
                    onClick={() => { setIsOtpMode(false); setPassError(''); }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-emerald-50/30 border border-emerald-200 rounded-xl pl-11 pr-4 py-3 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-bold tracking-[0.5em]"
                    placeholder="------"
                  />
                </div>
                <p className="text-xs text-emerald-600 mt-1">We sent an OTP to {portfolioData.personal.email}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              placeholder="Confirm new password"
            />
          </div>

          {passError && <p className="text-red-500 text-sm font-medium">{passError}</p>}
          
          {passSuccess && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 size={18} className="shrink-0" />
              <p className="text-sm font-medium">{passSuccess}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all font-medium"
            >
              <Save size={18} />
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Email Configuration Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Mail className="text-orange-500" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Email Configuration</h2>
            <p className="text-sm text-slate-500">Configure your Gmail address and App Password</p>
          </div>
        </div>

        <form onSubmit={handleEmailConfigChange} className="max-w-md space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Gmail Address</label>
            <input
              type="email"
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              placeholder="e.g. yourname@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">App Password</label>
            <input
              type="password"
              value={emailPass}
              onChange={(e) => setEmailPass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              placeholder="16-character App Password"
            />
            <div className="mt-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
              <p className="text-sm font-semibold text-orange-800 mb-2">How to get a Google App Password:</p>
              <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside">
                <li>Go to your <strong>Google Account Security</strong> page.</li>
                <li>Ensure <strong>2-Step Verification</strong> is turned ON.</li>
                <li>Search for <strong>"App passwords"</strong> in the top search bar.</li>
                <li>Select "Other (Custom name)", type "Portfolio", and click <strong>Generate</strong>.</li>
                <li>Copy the 16-character password (remove spaces) and paste it here.</li>
              </ol>
            </div>
          </div>

          {emailSuccess && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 size={18} className="shrink-0" />
              <p className="text-sm font-medium">{emailSuccess}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition-all font-medium"
            >
              <Save size={18} />
              Save Email Config
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
