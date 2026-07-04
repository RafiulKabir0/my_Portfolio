import React, { useState } from 'react';
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
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
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
                  <input type="text" value={item.title} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Issuer</label>
                  <input type="text" value={item.issuer} onChange={(e) => handleChange(index, 'issuer', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input type="text" value={item.date} onChange={(e) => handleChange(index, 'date', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                  <input type="text" value={item.image} onChange={(e) => handleChange(index, 'image', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:border-accent" />
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
export default AdminCertifications;