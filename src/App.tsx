import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

// Placeholder for admin components we will build next
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const AdminPersonal = React.lazy(() => import('./pages/admin/AdminPersonal'));
const AdminContacts = React.lazy(() => import('./pages/admin/AdminContacts'));
const AdminSkills = React.lazy(() => import('./pages/admin/AdminSkills'));
const AdminEducation = React.lazy(() => import('./pages/admin/AdminEducation'));
const AdminProjects = React.lazy(() => import('./pages/admin/AdminProjects'));
const AdminCertifications = React.lazy(() => import('./pages/admin/AdminCertifications'));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-primary text-slate-900 transition-colors duration-300">
          <Router>
            <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-primary">Loading...</div>}>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<Home />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/personal" replace />} />
                <Route path="personal" element={<AdminPersonal />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="education" element={<AdminEducation />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="certifications" element={<AdminCertifications />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="/admin/personal" replace />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </Router>
      </div>
    </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
