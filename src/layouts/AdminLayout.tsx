import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Code, GraduationCap, Briefcase, Award, LogOut, Home, Mail, ChevronRight, Settings } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

import { usePortfolio } from '../context/PortfolioContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: portfolioData } = usePortfolio();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Profile', path: '/admin/personal', icon: <User size={20} /> },
    { name: 'Contacts & Socials', path: '/admin/contacts', icon: <Mail size={20} /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase size={20} /> },
    { name: 'Education', path: '/admin/education', icon: <GraduationCap size={20} /> },
    { name: 'Achievements', path: '/admin/certifications', icon: <Award size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  // Get current page name for header
  const currentPage = navLinks.find(link => location.pathname.startsWith(link.path))?.name || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans transition-colors duration-300">
      {/* Sidebar - Theme Adaptable */}
      <aside className="w-72 bg-white border-r border-slate-200 text-slate-600 flex flex-col shadow-2xl z-20 transition-colors">
        <div className="h-20 flex items-center px-8 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center mr-3 shadow-lg shadow-accent/20 overflow-hidden">
            <img src={portfolioData.personal.profileImage} alt="Admin" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-wide">Admin Panel</span>
        </div>
        
        <div className="px-6 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Management
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive ? 'bg-accent text-white shadow-md shadow-accent/20' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-accent transition-colors'}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors mb-3 font-medium"
          >
            <Home size={18} /> View Live Site
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-xl text-slate-500 hover:text-red-500 hover:bg-slate-100 transition-colors font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 transition-colors">
          <div className="flex items-center text-slate-500">
            <span>Admin</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-slate-900 font-semibold">{currentPage}</span>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">{portfolioData.personal.name}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-300 overflow-hidden">
                 <img src={portfolioData.personal.profileImage} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 transition-colors">
          <div className="max-w-5xl mx-auto pb-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
