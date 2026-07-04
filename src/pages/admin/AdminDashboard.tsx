import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

const AdminDashboard = () => {
  const { data, updateData, resetToDefault } = usePortfolio();
  const [formData, setFormData] = useState(data);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData(formData);
    setSaveMessage('Changes saved locally!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (section: string, key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <div className="flex gap-4">
          <button 
            onClick={resetToDefault}
            className="px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Reset to Default
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* Hero Section Form */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input 
              type="text" 
              value={formData.personal.name}
              onChange={(e) => handleChange('personal', 'name', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <textarea 
              value={formData.personal.bio}
              onChange={(e) => handleChange('personal', 'bio', e.target.value)}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Personal Section Form */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <textarea 
              value={formData.personal.location}
              onChange={(e) => handleChange('personal', 'location', e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-accent resize-none"
            />
          </div>
        </div>
      </div>

      <div className="text-slate-500 text-sm text-center pt-8">
        More editable sections (Projects, Skills) can be added here!
      </div>
    </div>
  );
};

export default AdminDashboard;
