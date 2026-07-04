import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Mail, Phone, MapPin, Globe, Plus, Trash2 } from 'lucide-react';

const AdminContacts = () => {
  const { data, updateData } = usePortfolio();
  
  // Direct Contact Info State
  const [formData, setFormData] = useState({
    location: data.personal.location || '',
    email: data.personal.email || '',
    phone: data.personal.phone || ''
  });

  // Dynamic Socials State
  const [socials, setSocials] = useState(data.socials || []);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ 
      ...data, 
      personal: { ...data.personal, ...formData },
      socials: socials 
    });
    setSaveMessage('Contacts & Socials saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleContactChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSocialChange = (index: number, key: string, value: string) => {
    const newSocials = [...socials];
    newSocials[index] = { ...newSocials[index], [key]: value };
    setSocials(newSocials);
  };

  const addSocial = () => {
    setSocials([...socials, { id: Date.now().toString(), platform: 'New Platform', url: '', icon: 'Globe' }]);
  };

  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const availableIcons = ['Github', 'Linkedin', 'Facebook', 'Twitter', 'Instagram', 'Youtube', 'Globe', 'Mail', 'Link'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contacts & Socials</h1>
          <p className="text-slate-500 mt-1">How people can reach you and find you online</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accentHover hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
           <div className="w-2 h-2 rounded-full bg-green-500"></div>
           {saveMessage}
        </div>
      )}

      {/* Direct Contact Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Mail className="text-accent" size={20} /> Direct Contact Info
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" value={formData.email} onChange={(e) => handleContactChange('email', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={formData.phone} onChange={(e) => handleContactChange('phone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Physical Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={formData.location} onChange={(e) => handleContactChange('location', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Social Media Links */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe className="text-accent" size={20} /> Social Media Links
          </h2>
          <button onClick={addSocial} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Plus size={18} /> Add Social
          </button>
        </div>
        
        <div className="space-y-4">
          {socials.map((social: any, index: number) => (
            <div key={social.id || index} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-full md:w-1/4">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Platform Name</label>
                <input type="text" value={social.platform} onChange={(e) => handleSocialChange(index, 'platform', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-accent" placeholder="e.g. LinkedIn" />
              </div>
              <div className="w-full md:w-1/4">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Type</label>
                <select value={social.icon} onChange={(e) => handleSocialChange(index, 'icon', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-accent">
                  {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
              <div className="w-full md:w-2/4">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Profile URL</label>
                <div className="flex gap-2">
                  <input type="url" value={social.url} onChange={(e) => handleSocialChange(index, 'url', e.target.value)} className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-accent" placeholder="https://..." />
                  <button onClick={() => removeSocial(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {socials.length === 0 && (
            <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
              No social links added. Click "Add Social" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;