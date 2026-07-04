import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, User, AlignLeft, Briefcase, Mail, Upload, FileText } from 'lucide-react';

const AdminPersonal = () => {
  const { data, updateData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: data.personal.name || '',
    title: data.personal.title || '',
    bio: data.personal.bio || '',
    profileImage: data.personal.profileImage || '',
    profileImageName: data.personal.profileImageName || '',
    resumeUrl: data.personal.resumeUrl || '',
    resumeFileName: data.personal.resumeFileName || ''
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, personal: { ...data.personal, ...formData } });
    setSaveMessage('Profile saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500 mt-1">Manage your basic public information</p>
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <User className="text-accent" size={20} /> Identity
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Professional Title</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Profile Image</label>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                 {formData.profileImage ? (
                   <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-8 h-8 text-slate-400" />
                 )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-3">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, profileImage: reader.result as string, profileImageName: file.name});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:border-accent hover:text-accent transition-all cursor-pointer shadow-sm">
                      <Upload size={16} /> Upload New Image
                    </label>
                  </div>
                </div>
                {!formData.profileImageName && (
                  <div className="text-xs font-medium text-slate-500">
                    Or enter an external URL below:
                  </div>
                )}
                {!formData.profileImageName ? (
                  <div className="relative max-w-md">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={formData.profileImage}
                      onChange={(e) => setFormData({...formData, profileImage: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                ) : (
                  <button 
                    onClick={() => setFormData({...formData, profileImage: '', profileImageName: ''})}
                    className="text-xs text-red-500 hover:text-red-600 hover:underline font-medium"
                  >
                    Remove {formData.profileImageName}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Resume File (PDF)</label>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 flex flex-shrink-0 items-center justify-center">
                 <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-3">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                             alert("File is too large! Please keep it under 2MB to avoid storage issues.");
                             return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, resumeUrl: reader.result as string, resumeFileName: file.name});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:border-accent hover:text-accent transition-all cursor-pointer shadow-sm">
                      <Upload size={16} /> Upload PDF Document
                    </label>
                  </div>
                </div>
                {!formData.resumeFileName && (
                  <div className="text-xs font-medium text-slate-500">
                    Or enter an external URL below:
                  </div>
                )}
                {!formData.resumeFileName ? (
                  <div className="relative max-w-md">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                      placeholder="https://example.com/resume.pdf"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                ) : (
                  <button 
                    onClick={() => setFormData({...formData, resumeUrl: '', resumeFileName: ''})}
                    className="text-xs text-red-500 hover:text-red-600 hover:underline font-medium"
                  >
                    Remove {formData.resumeFileName}
                  </button>
                )}
              </div>
            </div>
          </div>
          

          
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Biography</label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-4 text-slate-400" size={18} />
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPersonal;