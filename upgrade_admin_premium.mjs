import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages', 'admin');

// 1. AdminPersonal.tsx (Profile Info)
const personalCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, User, AlignLeft, Briefcase } from 'lucide-react';

const AdminPersonal = () => {
  const { data, updateData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: data.personal.name,
    title: data.personal.title,
    bio: data.personal.bio
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              />
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
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPersonal;`;

// 2. AdminContacts.tsx
const contactsCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Mail, Phone, MapPin, Linkedin, Github, Facebook, Twitter, Globe } from 'lucide-react';

const AdminContacts = () => {
  const { data, updateData } = usePortfolio();
  const [formData, setFormData] = useState({
    location: data.personal.location,
    email: data.personal.email,
    phone: data.personal.phone,
    linkedin: data.personal.linkedin,
    github: data.personal.github,
    facebook: data.personal.facebook,
    twitter: data.personal.twitter
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, personal: { ...data.personal, ...formData } });
    setSaveMessage('Contacts & Socials saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Mail className="text-accent" size={20} /> Direct Contact Info
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Physical Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Globe className="text-accent" size={20} /> Social Media Links
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">LinkedIn URL</label>
            <div className="relative">
              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
              <input type="url" value={formData.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">GitHub URL</label>
            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800" size={18} />
              <input type="url" value={formData.github} onChange={(e) => handleChange('github', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Facebook URL</label>
            <div className="relative">
              <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
              <input type="url" value={formData.facebook} onChange={(e) => handleChange('facebook', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Twitter / X URL</label>
            <div className="relative">
              <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" size={18} />
              <input type="url" value={formData.twitter} onChange={(e) => handleChange('twitter', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminContacts;`;

// 3. Premium AdminProjects.tsx
const projectsCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, FolderGit2, Link as LinkIcon, Image, Type, Code } from 'lucide-react';

const AdminProjects = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.projects);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, projects: items });
    setSaveMessage('Projects saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleTechChange = (index: number, techString: string) => {
    const techs = techString.split(',').map(t => t.trim());
    handleChange(index, 'technologies', techs);
  };

  const handleAdd = () => {
    setItems([...items, { title: 'New Project', description: '', image: '', technologies: ['React'], github: '#' }]);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 mt-1">Manage the projects featured in your portfolio</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Plus size={18} /> Add Project
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accentHover hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
           <div className="w-2 h-2 rounded-full bg-green-500"></div>
           {saveMessage}
        </div>
      )}

      <div className="grid gap-8">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden group">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                   <FolderGit2 size={18} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Project #{index + 1}</h3>
              </div>
              <button onClick={() => handleDelete(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Project Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">GitHub / Live URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" value={item.github} onChange={(e) => handleChange(index, 'github', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Technologies (comma separated)</label>
                  <div className="relative">
                    <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" value={item.technologies.join(', ')} onChange={(e) => handleTechChange(index, e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Image URL</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" value={item.image} onChange={(e) => handleChange(index, 'image', e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2 h-[calc(100%-80px)]">
                  <label className="block text-sm font-semibold text-slate-700">Project Description</label>
                  <textarea value={item.description} onChange={(e) => handleChange(index, 'description', e.target.value)} className="w-full h-full min-h-[120px] bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
           <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <FolderGit2 size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">No projects added yet.</p>
           </div>
        )}
      </div>
    </div>
  );
};
export default AdminProjects;`;

// 4. Premium AdminSkills.tsx
const skillsCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, Code, Activity, Tag } from 'lucide-react';

const AdminSkills = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.skills);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, skills: items });
    setSaveMessage('Skills saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (index: number, key: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, { name: 'New Skill', level: 50, category: 'Core' }]);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Skills</h1>
          <p className="text-slate-500 mt-1">Manage your technical proficiencies</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all">
            <Plus size={18} /> Add Skill
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accentHover hover:shadow-lg hover:shadow-accent/30 transition-all duration-300">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
           <div className="w-2 h-2 rounded-full bg-green-500"></div>
           {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex flex-col gap-6 relative group hover:border-accent/40 transition-colors">
            <button onClick={() => handleDelete(index)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 pr-10">
               <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                 <span className="font-bold text-sm">{index + 1}</span>
               </div>
               <h3 className="font-bold text-slate-900 text-lg truncate">{item.name || 'Unnamed Skill'}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Skill Name</label>
                <div className="relative">
                  <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-slate-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Proficiency (0-100)</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="number" min="0" max="100" value={item.level} onChange={(e) => handleChange(index, 'level', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-slate-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" value={item.category} onChange={(e) => handleChange(index, 'category', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-slate-900 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-sm" />
                  </div>
                </div>
              </div>
              
              {/* Visual Progress Bar Indicator */}
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: \`\${item.level}%\` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminSkills;`;

fs.writeFileSync(path.join(pagesDir, 'AdminPersonal.tsx'), personalCode);
fs.writeFileSync(path.join(pagesDir, 'AdminContacts.tsx'), contactsCode);
fs.writeFileSync(path.join(pagesDir, 'AdminProjects.tsx'), projectsCode);
fs.writeFileSync(path.join(pagesDir, 'AdminSkills.tsx'), skillsCode);

console.log('Successfully upgraded admin page components to premium styling.');
