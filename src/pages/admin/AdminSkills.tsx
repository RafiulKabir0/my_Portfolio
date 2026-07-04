import React, { useState } from 'react';
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
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6 relative group hover:border-accent/40 transition-colors">
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
                   <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${item.level}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminSkills;