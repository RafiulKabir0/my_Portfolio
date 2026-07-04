import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages', 'admin');

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// 1. AdminPersonal.tsx
const personalCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

const AdminPersonal = () => {
  const { data, updateData } = usePortfolio();
  const [formData, setFormData] = useState(data.personal);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, personal: formData });
    setSaveMessage('Personal details saved locally!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Personal Details</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {saveMessage && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{saveMessage}</div>}

      <div className="glass-card p-6 space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">{key}</label>
            {key === 'bio' ? (
              <textarea 
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-accent resize-none"
              />
            ) : (
              <input 
                type="text" 
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-accent"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPersonal;`;

// 2. AdminSkills.tsx
const skillsCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminSkills = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.skills);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, skills: items });
    setSaveMessage('Skills saved locally!');
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Skills</h1>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 border border-slate-200/60 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Plus size={18} /> Add Skill
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors">
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      {saveMessage && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{saveMessage}</div>}

      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="glass-card p-6 flex gap-4 items-start">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input type="text" value={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Level (0-100)</label>
                <input type="number" value={item.level} onChange={(e) => handleChange(index, 'level', parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <input type="text" value={item.category} onChange={(e) => handleChange(index, 'category', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
              </div>
            </div>
            <button onClick={() => handleDelete(index)} className="p-2 mt-7 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminSkills;`;

// 3. AdminEducation.tsx
const eduCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminEducation = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.education);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, education: items });
    setSaveMessage('Education saved locally!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, { institution: 'New Inst', degree: 'Degree', duration: '2024', details: '' }]);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Education</h1>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 border border-slate-200/60 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Plus size={18} /> Add
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors">
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      {saveMessage && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{saveMessage}</div>}

      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="glass-card p-6 flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Institution</label>
                  <input type="text" value={item.institution} onChange={(e) => handleChange(index, 'institution', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Degree</label>
                  <input type="text" value={item.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                  <input type="text" value={item.duration} onChange={(e) => handleChange(index, 'duration', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
                <textarea value={item.details} onChange={(e) => handleChange(index, 'details', e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent resize-none" />
              </div>
            </div>
            <button onClick={() => handleDelete(index)} className="p-2 mt-7 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminEducation;`;

// 4. AdminProjects.tsx
const projectsCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminProjects = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.projects);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, projects: items });
    setSaveMessage('Projects saved locally!');
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 border border-slate-200/60 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Plus size={18} /> Add
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors">
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      {saveMessage && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{saveMessage}</div>}

      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="glass-card p-6 flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input type="text" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
                  <input type="text" value={item.github} onChange={(e) => handleChange(index, 'github', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                <input type="text" value={item.image} onChange={(e) => handleChange(index, 'image', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Technologies (comma separated)</label>
                <input type="text" value={item.technologies.join(', ')} onChange={(e) => handleTechChange(index, e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea value={item.description} onChange={(e) => handleChange(index, 'description', e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent resize-none" />
              </div>
            </div>
            <button onClick={() => handleDelete(index)} className="p-2 mt-7 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminProjects;`;

// 5. AdminCertifications.tsx
const certCode = `import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminCertifications = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.certifications);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, certifications: items });
    setSaveMessage('Certifications saved locally!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, { title: 'New Cert', issuer: '', date: '', image: '' }]);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Certifications</h1>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 border border-slate-200/60 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <Plus size={18} /> Add
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accentHover transition-colors">
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      {saveMessage && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{saveMessage}</div>}

      <div className="grid gap-6">
        {items.map((item, index) => (
          <div key={index} className="glass-card p-6 flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input type="text" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Issuer</label>
                  <input type="text" value={item.issuer} onChange={(e) => handleChange(index, 'issuer', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input type="text" value={item.date} onChange={(e) => handleChange(index, 'date', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                  <input type="text" value={item.image} onChange={(e) => handleChange(index, 'image', e.target.value)} className="w-full bg-slate-50 border border-slate-200/60 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(index)} className="p-2 mt-7 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminCertifications;`;

fs.writeFileSync(path.join(pagesDir, 'AdminPersonal.tsx'), personalCode);
fs.writeFileSync(path.join(pagesDir, 'AdminSkills.tsx'), skillsCode);
fs.writeFileSync(path.join(pagesDir, 'AdminEducation.tsx'), eduCode);
fs.writeFileSync(path.join(pagesDir, 'AdminProjects.tsx'), projectsCode);
fs.writeFileSync(path.join(pagesDir, 'AdminCertifications.tsx'), certCode);

console.log('Successfully generated admin page components.');
